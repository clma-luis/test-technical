import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { ContainerBody, ListOfCardsType } from "../components/ContainerBody";
import { NavbarMenu } from "../components/NavbarMenu";
import "../styles/app.scss";
import { initialStateCard } from "../utils/initialStateCard";

function App() {
  const [listOfCards, setListOfCards] =
    useState<Array<ListOfCardsType>>(initialStateCard);

  const [category, setCategory] = useState<string>("");

  return (
    <Container>
      <div className="App">
        <h1 className="title">Servicios</h1>
        <NavbarMenu setCategory={setCategory} />
        <ContainerBody
          listOfCards={listOfCards}
          setListOfCards={setListOfCards}
          category={category}
        />
      </div>
    </Container>
  );
}

export default App;
