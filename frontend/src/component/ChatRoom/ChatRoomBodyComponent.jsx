import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import MessageComponent from "./MessageComponent";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSendMessage } from "../../services/userServices";
import { addMessageAction } from "../../redux/actions/chatRoomActions";

function ChatRoomBodyComponent({ roomData, userData }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const cssPos = isSmallScreen ? { left: 0 } : {};

  useEffect(() => {
    const handlePositionInput = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    handlePositionInput();
    window.addEventListener("resize", handlePositionInput);

    return () => {
      window.removeEventListener("resize", handlePositionInput);
    };
  }, []);
  // Above is ui only
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.user);

  const sendMessage = async (e) => {
    const text = e.target.value;
    if (text.trim() === "" || e.code !== "Enter") return;
    const { members } = roomData;

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

  useEffect(() => {
    socket.on("User sends message", (message) => {
      dispatch(addMessageAction(message));
    });

    return () => {
      socket.off("User sends message");
    };
  }, [socket, dispatch]);

  return (
    <div
      className="w-100 position-relative"
      style={{ overflow: "auto", height: "90vh" }}
    >
      {/* Text input */}
      <div
        className="d-flex w-100 rounded align-items-center mb-3 stick-bottom "
        style={{
          backgroundColor: "#2e343d",
        }}
      >
        <FontAwesomeIcon className="ms-3 secondary" icon={faMagnifyingGlass} />

        <Form.Control
          onKeyUp={(e) => sendMessage(e)}
          className="custom-input text-white "
          style={{
            backgroundColor: "transparent",
            ...cssPos,
          }}
          size="lg"
          type="text"
          placeholder="Type message..."
        />
      </div>

      <div>
        {roomData.messages.map((msg, index) => {
          return (
            <MessageComponent
              msg={msg}
              key={index}
              isMe={userData._id === msg.owner._id ? true : false}
              read={msg.read}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ChatRoomBodyComponent;
