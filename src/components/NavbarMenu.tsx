import React, { Dispatch } from "react";
import { Nav, Navbar } from "react-bootstrap";
import "../styles/navbarMenu.scss";

export interface NavbarMenuProp {
  setfilterByCategory: Dispatch<number>;
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
              props.setfilterByCategory(0);
            }}
          >
            Todos
          </Nav.Link>
          <Nav.Link href="#auto">Autos</Nav.Link>
          <Nav.Link href="#health">Salud</Nav.Link>
          <Nav.Link
            href="#home"
            onClick={() => {
              props.setfilterByCategory(3);
            }}
          >
            Hogar
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
