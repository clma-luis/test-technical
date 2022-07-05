import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "../styles/containerBody.scss";

export const ContainerBody = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <div className="container__body">
      <div className="container__body__cards">
        <Card className="card">
          <Card.Body className="cardBody">
            <Card.Title className="cardBody-title">Card Title</Card.Title>
            <Card.Text className="cardBody-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <div className="container__body__cards__button-box">
              <Button className="edit_button" variant="link">
                Editar
              </Button>
              <Button className="delete_button" variant="link">
                Eliminar
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>

      <div className="container__body__form">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="form_inputs">
            <Card.Title>Servicio</Card.Title>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control {...register("nombre")} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control {...register("description")} />
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
            <Button variant="outline-danger">Cancelar</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
