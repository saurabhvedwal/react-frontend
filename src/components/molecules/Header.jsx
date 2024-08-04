import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import constants from "../../constants";
import { useLocation } from "react-router-dom";

const Header = (props) => {
  const { user = null, isLoggedIn, onLogout = () => {} } = props;

  const { pathname } = useLocation();

  return (
    <Navbar expand="lg" className="bg-body-secondary">
      <Container>
        <Navbar.Brand href={constants.APP_ROUTES.HOME}>
          Nodeworkshop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav className="">
            {!isLoggedIn && pathname !== constants.APP_ROUTES.LOGIN ? (
              <Nav.Link href={constants.APP_ROUTES.LOGIN}>Login</Nav.Link>
            ) : null}
            {!isLoggedIn && pathname !== constants.APP_ROUTES.SIGNUP ? (
              <Nav.Link href={constants.APP_ROUTES.SIGNUP}>Sign Up</Nav.Link>
            ) : null}
            {isLoggedIn ? (
              <Nav.Link href="/logout" onClick={onLogout}>
                Logout
              </Nav.Link>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
