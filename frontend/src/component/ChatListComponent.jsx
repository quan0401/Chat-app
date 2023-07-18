import { Container, Form, Image, Row, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ChatListItemComponent from "./ChatListItemComponent";
import { useDispatch } from "react-redux";
import { userLogoutAction } from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRoomAction } from "../redux/actions/chatRoomActions";
import { useEffect } from "react";

function ChatListComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userData, socket } = useSelector((state) => state.user);
  const { chatRoomsData, selectedRoomIndex } = useSelector(
    (state) => state.chatRoom
  );

  const handleSelectRoom = (roomIndex) => {
    dispatch(selectRoomAction(roomIndex));
  };

  const handleLogout = () => {
    dispatch(userLogoutAction());
    navigate("/login");
  };

  useEffect(() => {
    if (selectedRoomIndex !== -1) {
      console.log(0);
    }
  }, [selectedRoomIndex, chatRoomsData[selectedRoomIndex]?.messages]);

  return (
    <Container fluid>
      <Row>
        <Dropdown>
          <Dropdown.Toggle className="bg-transparent ">
            <div className="d-flex align-items-center">
              <Image
                style={{
                  width: 44,
                  height: 44,
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
                src={userData?.avatar}
              />
              <h4 className="m-0 p-0 ms-2">{userData.name}</h4>
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
            return (
              <ChatListItemComponent
                key={index}
                roomName={member.name}
                lastMessage={room.lastMessage}
                roomPhoto={member.avatar}
                onClick={() => {
                  handleSelectRoom(index);
                }}
              />
            );
          })}
      </div>
    </Container>
  );
}

export default ChatListComponent;
