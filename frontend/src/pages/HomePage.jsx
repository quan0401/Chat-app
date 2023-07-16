import { Col, Container, Row } from "react-bootstrap";
import ChatListComponent from "../component/ChatListComponent";
import ChatRoomComponent from "../component/ChatRoomComponent";
import { useEffect, useState } from "react";
import socketIO from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { setSocket } from "../redux/actions/userActions";

function HomePage() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const cssFullScreen = isFullScreen ? {} : { maxWidth: "400px" };
  const cssFullEdgeScreen = isFullScreen
    ? { marginLeft: -30, marginRight: -30 }
    : {};

  useEffect(() => {
    const handleResize = () => {
      setIsFullScreen(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // Above is ui only
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const socket = socketIO.connect();
    socket.emit("User online", userData._id);

    dispatch(setSocket(socket));
    return () => {
      socket.emit("User ofline", userData._id);
      socket.disconnect();
    };
  }, []);

  return (
    <Container fluid>
      <Row style={{ ...cssFullEdgeScreen }} className="mt-3">
        <Col
          xs={12}
          md={5}
          style={{
            ...cssFullScreen,
          }}
          className={`d-md-block ${isFullScreen ? "vh-100" : "w-400"}`}
        >
          <div className="chat-list-wrapper">
            <ChatListComponent />
          </div>
        </Col>

        <Col
          xxl={7}
          md={7}
          xs={12}
          className={`vh-100 ${isFullScreen ? "d-none" : ""}`}
        >
          <ChatRoomComponent />
        </Col>
        <Col className="d-none d-xxl-block">
          <h1>Chat Detail</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
