import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import "../styles/navbarMenu.scss";

export const NavbarMenu = () => {
  return (
    <Navbar className="navbar navbar-custom">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#all">Todos</Nav.Link>
          <Nav.Link href="#auto">Autos</Nav.Link>
          <Nav.Link href="#health">Salud</Nav.Link>
          <Nav.Link href="#home">Hogar</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
