import React, { useState, useEffect } from 'react';


const TodoEditForm = ({ todo, updateTodo, cancelEdit }) => {
  const [value, setValue] = useState(todo.text);
  const [category, setCategory] = useState(todo.category);


  useEffect(() => {
    setValue(todo.text);
    setCategory(todo.category);
  }, [todo]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value || !category) return;
    updateTodo(todo.id, value, category);
  };

  
  return (
    <div>
      <h2>Editar Tarefa</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Digite o Título'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value='categoria'>Selecione uma categoria</option>
          <option value='Trabalho'>Trabalho</option>
          <option value='Pessoal'>Pessoal</option>
          <option value='Estudos'>Estudos</option>
        </select>
        <button type='submit'>Salvar Tarefa</button>
        <button type='button' onClick={cancelEdit}>Cancelar</button>
      </form>
    </div>
  );
};

export default TodoEditForm;
