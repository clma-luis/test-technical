import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { ContainerBody, listOfCardsType } from "../components/ContainerBody";
import { NavbarMenu } from "../components/NavbarMenu";
import "../styles/app.scss";
import { initialStateCard } from "../utils/initialStateCard";

function App() {
  const [listOfCards, setListOfCards] =
    useState<Array<listOfCardsType>>(initialStateCard);

  return (
    <Container>
      <div className="App">
        <h1 className="title">Servicios</h1>
        <NavbarMenu />
        <ContainerBody
          listOfCards={listOfCards}
          setListOfCards={setListOfCards}
        />
      </div>
    </Container>
  );
}

export default App;
