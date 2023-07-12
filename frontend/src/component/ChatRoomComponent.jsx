import { Row, Col, Container } from "react-bootstrap";
import ChatRoomHeaderComponent from "./ChatRoom/ChatRoomHeaderComponent";
import ChatRoomBodyComponent from "./ChatRoom/ChatRoomBodyComponent";

function ChatRoomComponent() {
  return (
    <div>
      <ChatRoomHeaderComponent />
      <ChatRoomBodyComponent />
    </div>
  );
}

export default ChatRoomComponent;
