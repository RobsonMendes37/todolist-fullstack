import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 900px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [todos, setTodos] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getTodos = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setTodos(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, [setTodos]);

  return (
    <>
      <Container>
        <Title>To-Do-List</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getTodos={getTodos} />
        <Grid setOnEdit={setOnEdit} todos={todos} setTodos={setTodos} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;
