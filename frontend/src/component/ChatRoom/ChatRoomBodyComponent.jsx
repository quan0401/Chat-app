import { Container, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import MessageComponent from "./MessageComponent";
import { useEffect, useState } from "react";

function ChatRoomBodyComponent({ roomData, userData }) {
  const [inputText, setInputText] = useState("");
  const sendMessage = (textValue) => {};

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
          onKeyUp={(e) => sendMessage(e.target.value)}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
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
