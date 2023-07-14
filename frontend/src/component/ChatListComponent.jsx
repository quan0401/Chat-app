import {
  Container,
  Form,
  Image,
  Row,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ChatListItemComponent from "./ChatListItemComponent";
import { useDispatch } from "react-redux";
import { userLogoutAction } from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ChatListComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.user);
  const { chatRoomsData } = useSelector((state) => state.chatRoom);

  const handleLogout = () => {
    dispatch(userLogoutAction());
    navigate("/login");
  };
  return (
    <Container fluid>
      <Row>
        <Dropdown>
          <Dropdown.Toggle className="bg-transparent ">
            <div>
              <Image
                style={{
                  width: 44,
                  height: 44,
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
                src={userData?.avatar}
              />
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu className="my-bg-primary-color">
            <Dropdown.Item onClick={handleLogout} className="my-hover">
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Row>
      <div
        className="d-flex rounded-pill align-items-center mb-3"
        style={{
          backgroundColor: "#2e343d",
          cursor: "pointer",
        }}
      >
        <FontAwesomeIcon className="ms-3 secondary" icon={faMagnifyingGlass} />

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
      <div
        style={{
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
          // backgroundColor: "blue",
        }}
      >
        {chatRoomsData.length > 0 &&
          chatRoomsData.map((room, index) => {
            const member = room.members.find(
              (member) => userData._id !== member._id
            );
            console.log("room", room);
            console.log("member", member);
            return (
              <ChatListItemComponent
                key={index}
                roomName={member.name}
                lastMessage={room.lastMessage}
                roomPhoto={member.avatar}
              />
            );
          })}
      </div>
    </Container>
  );
}

export default ChatListComponent;
