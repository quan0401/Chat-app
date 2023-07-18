import { Col, Container, Row } from "react-bootstrap";
import ChatListComponent from "../component/ChatListComponent";
import ChatRoomComponent from "../component/ChatRoomComponent";
import { useEffect, useState } from "react";
import socketIO from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { setSocket, userLoginAction } from "../redux/actions/userActions";
import { getUserAndChatRoomData } from "../services/userServices";
import { setChatRoom } from "../redux/actions/chatRoomActions";

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
    socket.emit("User online", {
      userId: userData._id,
      // userChatRooms: userData.chatRooms,
    });

    dispatch(setSocket(socket));
    return () => {
      socket.emit("User ofline", userData._id);
      socket.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    getUserAndChatRoomData().then((res) => {
      const userData = res.data.user;
      const { chatRooms } = res.data;

      if (userData.doNotLogout) {
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("chatRoomsData", JSON.stringify(chatRooms));
      } else {
        sessionStorage.setItem("userData", JSON.stringify(userData));
        sessionStorage.setItem("chatRooms", JSON.stringify(chatRooms));
      }

      dispatch(setChatRoom(chatRooms));
      dispatch(userLoginAction(userData));
    });
  }, [dispatch]);

  return (
    <>
      <Row style={{ ...cssFullEdgeScreen }} className="mt-3 w-100">
        <Col
          xs={12}
          md={5}
          style={{
            ...cssFullScreen,
          }}
          className={`d-md-block p-0 ${
            isFullScreen ? "vh-100 d-none" : "w-400"
          }`}
        >
          <div className="chat-list-wrapper">
            <ChatListComponent />
          </div>
        </Col>

        <Col
          xxl={7}
          md={7}
          xs={12}
          // className={`vh-100 p-0 ${isFullScreen ? "d-none" : ""}`}
          className={`vh-100 p-0 `}
        >
          <ChatRoomComponent />
        </Col>
        <Col className="d-none d-xxl-block">
          <h1>Chat Detail</h1>
        </Col>
      </Row>
    </>
  );
}

export default HomePage;
