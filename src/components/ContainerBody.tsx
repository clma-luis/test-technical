import React, { Dispatch, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "../styles/containerBody.scss";
import { v4 as uuid } from "uuid";

export interface listOfCardsType {
  id: string;
  name: string;
  description: string;
}

export interface EditCardType {
  id: string;
  name: string;
  description: string;
}

export interface ContainerBodyProps {
  listOfCards: listOfCardsType[];
  setListOfCards: Dispatch<Array<listOfCardsType>>;
}

export const ContainerBody = (props: ContainerBodyProps) => {
  const [editCard, setEditCard] = useState<EditCardType | null>({
    id: "",
    name: "",
    description: "",
  });

  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  console.log("editCard", editCard);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    let res = {
      id: editCard ? editCard?.id : uuid(),
      name: data.name,
      description: data.description,
    };

    let reviewingListOfCards = props.listOfCards.filter(
      (a) => a.id !== editCard?.id
    );

    setTimeout(() => {
      props.setListOfCards([...reviewingListOfCards, res]);
    }, 100);

    setTimeout(() => {
      reset({
        name: "",
        description: "",
      });
      setEditCard(null);
    }, 150);
  };

  const handleEdit = (id: string, name: string, description: string) => {
    console.log("prueba", id);

    setEditCard({
      id: id,
      name: name,
      description: description,
    });
  };

  const handleRemove = (id: string) => {
    let result = props.listOfCards.filter((a) => a.id !== id);

    props.setListOfCards([...result]);
  };

  return (
    <div className="container__body">
      <div className="container__body__cards">
        {props?.listOfCards.map((item) => (
          <Card className="card" key={item?.id}>
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
                    handleEdit(item?.id, item?.name, item?.description);
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
            <Card.Title>Servicio</Card.Title>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                {...register("name")}
                defaultValue={editCard?.id && editCard?.name}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                {...register("description")}
                defaultValue={editCard?.id && editCard?.description}
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
            <Button
              variant="outline-danger"
              onClick={() => {
                reset(
                  {
                    name: "",
                    description: "",
                  },
                  {
                    keepErrors: true,
                    keepDirty: true,
                    keepIsSubmitted: false,
                    keepTouched: false,
                    keepIsValid: false,
                    keepSubmitCount: false,
                  }
                );
              }}
            >
              Cancelar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
