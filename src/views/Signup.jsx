import { Link } from "react-router-dom";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import { axiosClientBasic } from "../axios-client.js";
import constants from "../constants.js";

export default function Signup() {
  const [signupForm, setSignupForm] = useState({
    name: {
      value: "",
      type: "text",
      label: "Full Name",
      placeholder: "Full Name",
      id: "fullName",
    },
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
    confirm_password: {
      value: "",
      type: "text",
      label: "Confirm Password",
      placeholder: "Confirm Password",
      id: "confirm_password",
    },
  });

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      name: signupForm.name.value,
      email: signupForm.email.value,
      password: signupForm.password.value,
      confirm_password: signupForm.confirm_password.value,
    };
    axiosClientBasic
      .post(constants.API_ROUTES.SINGNUP, payload)
      .then(({ data }) => {})
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  const onFormFieldChange = (field) => (e) => {
    setSignupForm((prev) => ({
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
          <h1 className="text-center mb-4">Sign Up</h1>
          <Form className="row g-3" onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="name">{signupForm.name.label}</Form.Label>
              <Form.Control
                type={signupForm.name.type}
                id={signupForm.name.id}
                className="form-control"
                value={signupForm.name.value}
                placeholder={signupForm.name.placeholder}
                onChange={onFormFieldChange("name")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">{signupForm.email.label}</Form.Label>
              <Form.Control
                type={signupForm.email.type}
                id={signupForm.email.id}
                className="form-control"
                value={signupForm.email.value}
                placeholder={signupForm.email.placeholder}
                onChange={onFormFieldChange("email")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">
                {signupForm.password.label}
              </Form.Label>
              <Form.Control
                type={signupForm.password.type}
                id={signupForm.password.id}
                className="form-control"
                value={signupForm.password.value}
                placeholder={signupForm.password.placeholder}
                onChange={onFormFieldChange("password")}
              />
            </Form.Group>
            <Form.Group>
              <Button type="submit" variant="primary" className="mb-3 w-100">
                Sign Up
              </Button>
              <p className="message">
                Already registered? <Link to={constants.APP_ROUTES.LOGIN}>Sign In</Link>
              </p>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
