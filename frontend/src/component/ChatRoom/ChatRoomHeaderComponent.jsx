import { Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPhone,
  faEllipsisVertical,
  faWindowMaximize,
} from "@fortawesome/free-solid-svg-icons";

function ChatRoomHeaderComponent({ roomData, userData }) {
  let isGroup = false;
  const room = { name: "", photo: "" };
  if (roomData.members.length <= 2) {
    const member = roomData.members.find(
      (member) => member._id !== userData._id
    );
    room.name = member.name;
    room.photo = member.avatar;
  }
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col xs="7" lg="9">
          <div className="d-flex align-items-center">
            <Image
              src={room.photo}
              className="object-fit-cover me-3"
              style={{
                height: "40px",
                width: "40px",
                borderRadius: "50%",
              }}
            />
            <div>
              <h3 className="m-0">{room.name}</h3>
              {isGroup ? (
                <p className="p-0 m-0 secondary">45 members, 24 online</p>
              ) : (
                <p className="p-0 m-0 secondary">Active 8 m ago</p>
              )}
            </div>
          </div>
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
    </>
  );
}

export default ChatRoomHeaderComponent;
