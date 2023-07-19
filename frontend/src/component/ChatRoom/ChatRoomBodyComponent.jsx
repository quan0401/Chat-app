import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import MessageComponent from "./MessageComponent";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessageAction } from "../../redux/actions/chatRoomActions";

function ChatRoomBodyComponent({ roomData, userData }) {
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.user);

  const lastMessageReadIndex = {};

  roomData.messages.forEach((msg, index) => {
    msg.read.forEach((reader) => {
      if (reader !== userData._id) lastMessageReadIndex[reader] = index;
    });
  });

  const sendMessage = async (e) => {
    const text = e.target.value;
    if (text.trim() === "" || e.code !== "Enter") return;
    const { members } = roomData;

    // Add message for the sender using callback
    socket.emit(
      "User sends message",
      {
        senderId: userData._id,
        content: text,
        receivers: members.filter((member) => member._id !== userData._id),
        roomId: roomData._id,
      },
      (message) => {
        dispatch(addMessageAction(message));
      }
    );
    e.target.value = "";
  };

  // Add message for the receiver
  useEffect(() => {
    if (socket)
      socket.on("User sends message", (message) => {
        dispatch(addMessageAction(message));
      });

    return () => {
      socket.off("User sends message");
    };
  }, [socket, dispatch]);

  return (
    <div style={{ height: "100vh" }}>
      <div className="w-100 overflow-y-auto overflow-x-visible position-relative custom-chatRoomHeight">
        {/* Text input */}
        <div
          className="d-flex w-100 rounded align-items-center mb-3 stick-bottom "
          style={{
            backgroundColor: "#2e343d",
          }}
        >
          <FontAwesomeIcon
            className="ms-3 secondary"
            icon={faMagnifyingGlass}
          />

          <Form.Control
            onKeyUp={(e) => sendMessage(e)}
            className="custom-input text-white "
            style={{
              backgroundColor: "transparent",
            }}
            size="lg"
            type="text"
            placeholder="Type message..."
          />
        </div>

        <div>
          {roomData.messages.map((msg, index) => {
            const readers = roomData.members.reduce((acc, currentMem) => {
              if (lastMessageReadIndex[currentMem._id] === index) {
                acc.push(currentMem);
                return acc;
              } else return acc;
            }, []);

            return (
              <MessageComponent
                msg={msg}
                key={index}
                isMe={userData._id === msg.owner._id ? true : false}
                readers={readers}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ChatRoomBodyComponent;
