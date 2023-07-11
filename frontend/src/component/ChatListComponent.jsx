import { Container, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ChatListItemComponent from "./ChatListItemComponent";

function ChatListComponent() {
  return (
    <Container
      fluid
      style={{
        maxWidth: "400px",
      }}
    >
      <div
        className="d-flex rounded-pill align-items-center mb-3"
        style={{
          backgroundColor: "#2e343d",
        }}
      >
        <FontAwesomeIcon
          color="#9a9d9f"
          className="ms-3"
          icon={faMagnifyingGlass}
        />

        <Form.Control
          className="custom-input text-white"
          style={{
            backgroundColor: "transparent",
          }}
          size="lg"
          type="text"
          placeholder="Search"
        />
      </div>
      <div>
        <ChatListItemComponent />
        <ChatListItemComponent />
      </div>
    </Container>
  );
}

export default ChatListComponent;
