import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { ContainerBody, ListOfCardsType } from "../components/ContainerBody";
import { NavbarMenu } from "../components/NavbarMenu";
import "../styles/app.scss";
import { initialStateCard } from "../utils/initialStateCard";

function App() {
  const [listOfCards, setListOfCards] =
    useState<Array<ListOfCardsType>>(initialStateCard);
  const [filterByCategory, setfilterByCategory] = useState<number | null>(null);

  return (
    <Container>
      <div className="App">
        <h1 className="title">Servicios</h1>
        <NavbarMenu setfilterByCategory={setfilterByCategory} />
        <ContainerBody
          listOfCards={listOfCards}
          setListOfCards={setListOfCards}
          filterByCategory={filterByCategory}
        />
      </div>
    </Container>
  );
}

export default App;
