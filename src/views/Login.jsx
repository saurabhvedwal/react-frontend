import { useContext, useState } from "react";
import { Link, redirect } from "react-router-dom";
import { axiosClientBasic } from "../axios-client.js";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import constants from "../constants";
import { AuthContext } from "../context";

export default function Login() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [loginForm, setLoginForm] = useState({
    email: {
      value: "",
      type: "text",
      label: "Email",
      placeholder: "Email",
      id: "email",
    },
    password: {
      value: "",
      type: "password",
      label: "Password",
      placeholder: "Password",
      id: "password",
    },
  });

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      email: loginForm.email.value,
      password: loginForm.password.value,
    };
    axiosClientBasic
      .post(constants.API_ROUTES.LOGIN_ROUTE, payload)
      .then(() => {
        setIsLoggedIn(true);
        console.log("Successfully loged in");
        return redirect(constants.APP_ROUTES.DASHBOARD);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message);
        }
      });
  };

  const onFormFieldChange = (field) => (e) => {
    setLoginForm((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value: e.target.value,
      },
    }));
  };

  return (
    <Container>
      <Row className="animated fadeInDown justify-content-md-center mt-5">
        <Col xs="12" md="6" lg="4">
          <h1 className="text-center mb-4">User Login</h1>
          <Form className="row g-3" onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">{loginForm.email.label}</Form.Label>
              <Form.Control
                type={loginForm.email.type}
                id={loginForm.email.id}
                className="form-control"
                value={loginForm.email.value}
                placeholder={loginForm.email.placeholder}
                onChange={onFormFieldChange("email")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">
                {loginForm.password.label}
              </Form.Label>
              <Form.Control
                type={loginForm.password.type}
                id={loginForm.password.id}
                className="form-control"
                value={loginForm.password.value}
                placeholder={loginForm.password.placeholder}
                onChange={onFormFieldChange("password")}
              />
            </Form.Group>
            <Form.Group>
              <Button type="submit" variant="primary" className="mb-3 w-100">
                Login
              </Button>
              <p className="message">
                Not registered? <Link to="/signup">Create an account</Link>
              </p>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
