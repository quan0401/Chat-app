import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPhone,
  faEllipsisVertical,
  faWindowMaximize,
} from "@fortawesome/free-solid-svg-icons";

function ChatRoomHeaderComponent() {
  return (
    <Row className="align-items-center mb-4">
      <Col xs="7" lg="9">
        <h2 className="m-0">Chatroom name</h2>
        <p className="p-0 m-0 secondary">45 members, 24 online</p>
      </Col>
      <Col xs="5" lg="3" className=" pe-4">
        <div className="d-flex align-content-center justify-content-between">
          <FontAwesomeIcon
            className="secondary"
            style={{ cursor: "pointer" }}
            fontSize={18}
            icon={faMagnifyingGlass}
          />
          <FontAwesomeIcon
            className="secondary"
            style={{ cursor: "pointer" }}
            fontSize={18}
            icon={faWindowMaximize}
          />
          <FontAwesomeIcon
            className="secondary"
            style={{ cursor: "pointer" }}
            fontSize={18}
            icon={faPhone}
          />
          <FontAwesomeIcon
            className="secondary"
            style={{ cursor: "pointer" }}
            fontSize={18}
            icon={faEllipsisVertical}
          />
        </div>
      </Col>
    </Row>
  );
}

export default ChatRoomHeaderComponent;
