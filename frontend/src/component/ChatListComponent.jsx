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

function ChatListComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
                src="/img/ava.jpg"
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
        {Array.from({ length: 100 }).map((item, index) => (
          <ChatListItemComponent key={index} />
        ))}
      </div>
    </Container>
  );
}

export default ChatListComponent;
