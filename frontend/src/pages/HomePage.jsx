import { Col, Container, Row } from "react-bootstrap";
import ChatListComponent from "../component/ChatListComponent";
import ChatRoomComponent from "../component/ChatRoomComponent";
import { useEffect } from "react";
import socketIO from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { setSocket, userLoginAction } from "../redux/actions/userActions";
import { getUserAndChatRoomData } from "../services/userServices";
import {
  addMessageAction,
  markAsReadAction,
  setChatRoom,
} from "../redux/actions/chatRoomActions";

function HomePage() {
  const dispatch = useDispatch();
  const { userData, socket } = useSelector((state) => state.user);

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

  useEffect(() => {
    if (socket)
      socket.on("Mark message as read", ({ roomId, readerId }) => {
        dispatch(markAsReadAction(roomId, readerId));
      });
    return () => {
      if (socket) socket.off("Mark message as read");
    };
  }, [dispatch, socket]);

  // Add message for the receiver
  useEffect(() => {
    if (socket)
      socket.on("User sends message", ({ message, roomId }) => {
        dispatch(addMessageAction(message, roomId));
      });

    return () => {
      if (socket) socket.off("User sends message");
    };
  }, [socket, dispatch]);

  return (
    <>
      <Container fluid>
        <Row className="mt-3 overflow-x-hidden">
          <Col md={4} xxl={3} className="d-none d-md-block">
            <ChatListComponent />
          </Col>

          <Col xxl={6} md={8} xs={12}>
            <ChatRoomComponent />
          </Col>
          <Col xxl={3} className=" d-none d-xxl-block">
            <h1>Chat Room detail</h1>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomePage;
