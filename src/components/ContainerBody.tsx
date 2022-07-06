import React, { Dispatch, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "../styles/containerBody.scss";
import { v4 as uuid } from "uuid";

export interface ListOfCardsType {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface ContainerBodyProps {
  listOfCards: ListOfCardsType[];
  setListOfCards: Dispatch<Array<ListOfCardsType>>;
  category: string;
}

export const ContainerBody = (props: ContainerBodyProps) => {
  const initialState: ListOfCardsType = {
    id: "",
    name: "",
    description: "",
    category: "",
  };

  const categories: string[] = ["Autos", "Salud", "Hogar"];

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const truncate = (str: string, n: number): string => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    defaultValues: initialState,
  });

  const clearForm = (): void => {
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
      category: data.category,
    };
    props.setListOfCards([...props.listOfCards, newCard]);
  };

  const editCard = (data: ListOfCardsType): void => {
    const card: ListOfCardsType = {
      id: data.id,
      name: data.name,
      description: data.description,
      category: data.category,
    };

    const cardIndex = props.listOfCards.findIndex((el) => el.id === data.id);
    let newLisOfCards: ListOfCardsType[] = [...props.listOfCards];
    newLisOfCards[cardIndex] = card;
    props.setListOfCards(newLisOfCards);
  };

  const handleEdit = (element: ListOfCardsType): void => {
    setIsEdit(true);
    setValue("id", element.id);
    setValue("name", element.name);
    setValue("description", element.description);
    setValue("category", element.category);
  };

  const handleRemove = (id: string): void => {
    let result: ListOfCardsType[] = props.listOfCards.filter(
      (a) => a.id !== id
    );
    props.setListOfCards([...result]);
  };

  return (
    <div className="container__body">
      <div className="container__body__cards">
        {props?.listOfCards
          .filter((item) => {
            return item.category.includes(props.category);
          })
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((item, i) => (
            <Card className="card" key={i}>
              <Card.Body className="cardBody">
                <Card.Title className="cardBody-title">
                  {truncate(item?.name, 25)}
                </Card.Title>
                <Card.Text className="cardBody-text">
                  {truncate(item?.description, 90)}
                </Card.Text>
                <Card.Footer className="container__body__cards__button-box">
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
                </Card.Footer>
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
                {...register("name", {
                  required: "Nombre requerido*",
                  minLength: 5,
                })}
              />
              {errors.name ? (
                <>
                  {errors.name.type === "required" && (
                    <p className="required">El nombre es requerido*</p>
                  )}
                  {errors.name.type === "minLength" && (
                    <p className="warning">Mínimo requerido: 5 letras*</p>
                  )}
                </>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                {...register("description", {
                  required: "Descripción requerida*",
                  minLength: 10,
                })}
              />
              {errors.description ? (
                <>
                  {errors.description.type === "required" && (
                    <p className="required">La Descripción es requerida*</p>
                  )}
                  {errors.description.type === "minLength" && (
                    <p className="warning">Mínimo requerido: 10 letras*</p>
                  )}
                </>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Select
                {...register("category", {
                  required: "Categoría requerida*",
                })}
                aria-label="Default select example"
              >
                <option></option>
                {categories.map((item) => (
                  <option>{item}</option>
                ))}
              </Form.Select>
              {errors.category ? (
                <>
                  {errors.category.type === "required" && (
                    <p className="required">La Categoría es requerida*</p>
                  )}
                </>
              ) : null}
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
