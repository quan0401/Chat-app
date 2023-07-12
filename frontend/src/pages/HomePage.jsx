// import { Col, Container, Row } from "react-bootstrap";
// import ChatListComponent from "../component/ChatListComponent";
// import ChatRoomComponent from "../component/ChatRoomComponent";
// function HomePage() {
//   return (
//     <Container fluid>
//       {/* <Row className="mt-3">
//         <Col xxl="3" md="5" className="d-none d-md-block">
//           <ChatListComponent />
//         </Col>

//         <Col xxl="6" md="7" xs="12" className="vh-100">
//           <div className="">
//             <ChatRoomComponent />
//           </div>
//         </Col>

// <Col xxl="3" className="d-none d-xxl-block">
//   <h1>Chat Detail</h1>
// </Col>
//       </Row> */}

//       <Row className="mt-3">
//         <Col xs={12} md={5} className=" d-md-block">
//           <div
//             className={`chat-list-wrapper ${
//               window.innerWidth < 576 ? "fullscreen" : "w-400"
//             }`}
//           >
//             <ChatListComponent />
//           </div>
//         </Col>

//         <Col xxl={6} md={7} xs={12} className="vh-100 d-none">
//           <div className="">
//             <ChatRoomComponent />
//           </div>
//         </Col>
//       </Row>

//       {/* <div className="d-flex">
//         <div
//           style={{ width: 400, minWidth: 400 }}
//           className="d-none d-md-block"
//         >
//           <ChatListComponent />
//         </div>

// <div xxl="6" md="12" xs="12" className="vh-100 w-100">
//   <div>
//     <ChatRoomComponent />
//   </div>
// </div>
//       </div> */}
//     </Container>
//   );
// }

// export default HomePage;

import { Col, Container, Row } from "react-bootstrap";
import ChatListComponent from "../component/ChatListComponent";
import ChatRoomComponent from "../component/ChatRoomComponent";
import { useEffect, useState } from "react";

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
