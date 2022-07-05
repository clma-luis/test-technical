import React from "react";
import { Container } from "react-bootstrap";
import { ContainerBody } from "../components/ContainerBody";
import { NavbarMenu } from "../components/NavbarMenu";
import "../styles/app.scss";

function App() {
  return (
    <Container>
      <div className="App">
        <h1 className="title">Servicios</h1>
        <NavbarMenu />
        <ContainerBody />
      </div>
    </Container>
  );
}

export default App;
