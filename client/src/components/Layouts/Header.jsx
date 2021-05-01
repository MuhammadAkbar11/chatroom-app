import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  return (
    <header className="header">
      <Navbar className="py-4" variant="dark" expand="lg" collapseOnSelect>
        <Container fluid>
          <LinkContainer to="/" className="border">
            <Navbar.Brand>
              {" "}
              <span className="text-primary text-uppercase">
                Bae ChatRoom
              </span>{" "}
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/login">
                <Nav.Link>
                  {" "}
                  <i className="fas fa-user mr-1" />
                  Sign in
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
