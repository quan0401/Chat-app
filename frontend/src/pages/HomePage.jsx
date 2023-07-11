import { Col, Container, Row } from "react-bootstrap";
import ChatListComponent from "../component/ChatListComponent";
function HomePage() {
  return (
    <Container fluid>
      <Row className="mt-3">
        <Col xxl="3" md="4" className="d-none d-lg-block">
          <ChatListComponent />
        </Col>
        <Col xxl="6" md="8" xs="12">
          {/* <h1>Chat room</h1> */}
          <h1>ChatRoom</h1>
        </Col>
        <Col xxl="3" md="3" className="d-none d-xxl-block">
          <h1>Chat Detail</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
