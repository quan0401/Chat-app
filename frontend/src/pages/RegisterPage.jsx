import { useState } from "react";
import {
  Container,
  Button,
  Col,
  Form,
  InputGroup,
  Row,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/userServices";

function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    const {
      email: { value: email },
      password: { value: password },
      username: { value: username },
    } = form.elements;
    if (
      form.checkValidity() === true &&
      password.length >= 8 &&
      username.trim() !== "" &&
      password.trim() !== ""
    ) {
      registerUser(username, email, password)
        .then((res) => {
          console.log(res);
          navigate("/login", { replace: true });
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }

    setValidated(true);
  };

  return (
    <Container
      style={{
        height: "100vh",
        maxWidth: "600px",
      }}
    >
      <Row className="h-100 align-items-center">
        <div>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>
                  Username <span className="text-danger">*</span>{" "}
                </Form.Label>

                <Form.Control
                  required
                  type="text"
                  name="username"
                  placeholder="username"
                />

                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label>Email</Form.Label>

                <InputGroup>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>

                  <Form.Control
                    type="email"
                    placeholder="abc@gmail.com"
                    name="email"
                  />

                  <Form.Control.Feedback type="invalid">
                    Please choose a username.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="12">
                <Form.Label>
                  Password <span className="text-danger">*</span>
                </Form.Label>

                <Form.Control
                  type="password"
                  minLength="8"
                  placeholder="Password"
                  name="password"
                  required
                />

                <Form.Control.Feedback type="invalid">
                  Please provide a valid password.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <p>
              Already have an account?{" "}
              <a onClick={() => navigate("/login")} className="a">
                Login
              </a>{" "}
            </p>

            <Button className="btn1 position-relative" type="submit">
              Register
              {errorMessage && (
                <Alert
                  className="mt-3 position-absolute"
                  style={{
                    width: 400,
                    left: 0,
                    pointerEvents: "none",
                  }}
                  variant="danger"
                >
                  {errorMessage}
                </Alert>
              )}
            </Button>
          </Form>
        </div>
      </Row>
    </Container>
  );
}

export default RegisterPage;
