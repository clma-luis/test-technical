import React, { Dispatch, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "../styles/containerBody.scss";
import { v4 as uuid } from "uuid";

export interface ListOfCardsType {
  id: string;
  name: string;
  description: string;
}

export interface ContainerBodyProps {
  listOfCards: ListOfCardsType[];
  setListOfCards: Dispatch<Array<ListOfCardsType>>;
  filterByCategory: number | null;
}

export const ContainerBody = (props: ContainerBodyProps) => {
  const initialState: ListOfCardsType = {
    id: "",
    name: "",
    description: "",
  };

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  const { register, handleSubmit, reset, setValue } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    defaultValues: initialState,
  });

  const clearForm = () => {
    reset(initialState, {
      keepErrors: true,
      keepDirty: true,
      keepIsSubmitted: false,
      keepTouched: false,
      keepIsValid: false,
      keepSubmitCount: false,
    });

    setIsEdit(false);
  };

  const onSubmit = (data: ListOfCardsType): void => {
    if (!isEdit) {
      createCard(data);
    } else {
      editCard(data);
    }

    clearForm();
  };

  const createCard = (data: ListOfCardsType): void => {
    const newCard = {
      id: uuid(),
      name: data.name,
      description: data.description,
    };
    props.setListOfCards([...props.listOfCards, newCard]);
  };

  const editCard = (data: ListOfCardsType): void => {
    const card = {
      id: data.id,
      name: data.name,
      description: data.description,
    };

    const cardIndex = props.listOfCards.findIndex((el) => el.id === data.id);
    let newLisOfCards = [...props.listOfCards];
    newLisOfCards[cardIndex] = card;
    props.setListOfCards(newLisOfCards);
  };

  const handleEdit = (element: ListOfCardsType) => {
    console.log("element", element);
    setIsEdit(true);
    setValue("id", element.id);
    setValue("name", element.name);
    setValue("description", element.description);
  };

  const handleRemove = (id: string) => {
    let result = props.listOfCards.filter((a) => a.id !== id);

    props.setListOfCards([...result]);
  };

  return (
    <div className="container__body">
      <div className="container__body__cards">
        {props?.listOfCards
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((item, i) => (
            <Card className="card" key={i}>
              <Card.Body className="cardBody">
                <Card.Title className="cardBody-title">
                  {truncate(item?.name, 18)}
                </Card.Title>
                <Card.Text className="cardBody-text">
                  {truncate(item?.description, 90)}
                </Card.Text>
                <div className="container__body__cards__button-box">
                  <Button
                    className="edit_button"
                    variant="link"
                    onClick={() => {
                      handleEdit(item);
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    className="delete_button"
                    variant="link"
                    onClick={() => {
                      handleRemove(item?.id);
                    }}
                  >
                    Eliminar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
      </div>

      <div className="container__body__form">
        <Form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form_inputs">
            <Card.Title>{isEdit ? "Editar" : "Crear"} Servicio</Card.Title>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                {...register("name", { required: "Descripción requerida" })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                {...register("description", {
                  required: "Descripción requerida",
                })}
              />
            </Form.Group>
          </div>

          <div className="button_box">
            <Button
              className="button-success"
              variant="outline-success"
              type="submit"
            >
              Grabar
            </Button>
            <Button variant="outline-danger" onClick={clearForm}>
              Cancelar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
