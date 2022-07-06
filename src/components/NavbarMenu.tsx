import React, { Dispatch } from "react";
import { Nav, Navbar } from "react-bootstrap";
import "../styles/navbarMenu.scss";

export interface NavbarMenuProp {
  setCategory: Dispatch<string>;
}

export const NavbarMenu = (props: NavbarMenuProp) => {
  return (
    <Navbar className="navbar navbar-custom">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link
            href="#all"
            onClick={() => {
              props.setCategory("");
            }}
          >
            Todos
          </Nav.Link>
          <Nav.Link
            href="#auto"
            onClick={() => {
              props.setCategory("Autos");
            }}
          >
            Autos
          </Nav.Link>
          <Nav.Link
            href="#health"
            onClick={() => {
              props.setCategory("Salud");
            }}
          >
            Salud
          </Nav.Link>
          <Nav.Link
            href="#home"
            onClick={() => {
              props.setCategory("Hogar");
            }}
          >
            Hogar
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
