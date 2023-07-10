import { useEffect, useState } from "react";

import { Container, Button, Col, Form, Row } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import { loginUser, testUser } from "../services/userServices";

function LoginPage() {
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    const {
      password: { value: passwordValue },
      username: { value: usernameValue },
    } = form.elements;

    if (
      form.checkValidity() === true &&
      passwordValue.length >= 8 &&
      usernameValue.trim() !== "" &&
      passwordValue.trim() !== ""
    ) {
      loginUser(usernameValue, passwordValue).then((res) => {
        console.log(res);
        setValidated(!validated);
      });
    }
  };

  useEffect(() => {
    testUser().then((res) => {
      console.log("test", res);
    });
  }, [validated]);

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
              <Form.Group as={Col} md="12">
                <Form.Label>
                  Username or email <span className="text-danger">*</span>{" "}
                </Form.Label>

                <Form.Control
                  required
                  type="text"
                  name="username"
                  placeholder="Username or email"
                />

                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                  required
                  name="password"
                />

                <Form.Control.Feedback type="invalid">
                  Please provide a valid password.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                label="Do not logout"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>
            <p>
              Don't have an account?{" "}
              <a onClick={() => navigate("/register")} className="a">
                Register
              </a>{" "}
            </p>

            <Button className="btn1" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </Row>
    </Container>
  );
}

export default LoginPage;
