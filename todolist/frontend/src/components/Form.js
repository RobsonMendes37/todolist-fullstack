import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  min-width:500px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getTodos, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const todo = ref.current;

      todo.texto.value = onEdit.texto;
      todo.categoria.value = onEdit.categoria;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todo = ref.current;

    if (
      !todo.texto.value ||
      !todo.categoria.value 
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          texto: todo.texto.value,
          categoria: todo.categoria.value
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          texto: todo.texto.value,
          categoria: todo.categoria.value
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    todo.texto.value = "";
    todo.categoria.value = "";

    setOnEdit(null);
    getTodos();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Título</Label>
        <Input name="texto" />
      </InputArea>
      <InputArea>
        <Label>Categoria</Label>
        <Input width='300px' name="categoria" />
      </InputArea>
      <Button type="submit">SALVAR</Button>
    </FormContainer>
    
  );
};
  
export default Form;
