import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import MessageComponent from "./MessageComponent";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessageAction } from "../../redux/actions/chatRoomActions";

function ChatRoomBodyComponent({
  roomData,
  userData,
  selectedRoomIndex,
  setfetchApi,
  handleScrollIntoView,
}) {
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.user);

  const lastMessageReadIndex = {};

  // for read feature, last message index that one read
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
      (message, roomId) => {
        dispatch(addMessageAction(message, roomId));
        setTimeout(() => {
          handleScrollIntoView();
        }, 500);
      }
    );
    e.target.value = "";
  };

  useEffect(() => {
    handleScrollIntoView();
  }, [selectedRoomIndex]);

  const handleScroll = (e) => {
    const chatRoomBody = document.getElementById("chatRoomBody");

    if (chatRoomBody.scrollTop === 0) {
      setfetchApi((prev) => {
        const count = prev.count + 1;
        return { fetch: true, count: count };
      });
    }
  };

  useEffect(() => {
    const chatRoomBody = document.getElementById("chatRoomBody");

    chatRoomBody.addEventListener("scroll", handleScroll);

    // Step 4 (continued): Remove the scroll event listener when the component is unmounted
    return () => {
      chatRoomBody.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <div
        id="chatRoomBody"
        className="w-100 overflow-y-auto overflow-x-visible position-relative custom-chatRoomHeight"
      >
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
          <div id="intoView"></div>
        </div>
      </div>
    </div>
  );
}

export default ChatRoomBodyComponent;
