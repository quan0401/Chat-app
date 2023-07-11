import { Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck as faCircleCheckReg } from "@fortawesome/free-regular-svg-icons";

function ChatListItemComponent() {
  return (
    <Row className="chat-list-item align-items-center">
      <Col
        xs="2"
        xl="3"
        style={{
          alignItems: "center",
          display: "flex",
          maxWidth: "80px",
        }}
      >
        <div
          style={{
            height: "60px",
            width: "60px",
          }}
        >
          <Image
            src="/public/img/ava.jpg"
            className="object-fit-cover"
            style={{
              height: "60px",
              width: "60px",
            }}
            rounded
          />
        </div>
      </Col>
      <Col xs="8" xl="7">
        <div className="rounded mt-3 ms-3 ms-xl-0">
          <h6 className="text-overflow text-white">Name</h6>
          <p className="text-overflow">Message fkajfkdasfj</p>
        </div>
      </Col>
      <Col xs="2" xl="2">
        <div>
          <Row>12:19</Row>

          <FontAwesomeIcon fontSize={14} color="#6c8afc" icon={faCircle} />
          <FontAwesomeIcon
            fontSize={14}
            color="#6c8afc"
            icon={faCircleCheckReg}
          />
          <FontAwesomeIcon fontSize={14} color="#6c8afc" icon={faCircleCheck} />
        </div>
      </Col>
    </Row>
  );
}

export default ChatListItemComponent;
