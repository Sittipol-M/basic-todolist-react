import TodoList from "./TodoList";
import { useState, useRef, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();
  const LOCAL_STORAGE_KEY = "TODOAPP";

  //get back todos
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos.length > 0) setTodos(storedTodos);
  }, []);

  //save when todos change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  };

  const handleAddTodo = (event) => {
    const name = todoNameRef.current.value;
    if (name === "") return;
    //should set new array
    //prevTodos to set new array
    setTodos((prevTodos) => {
      return [...prevTodos, { id: prevTodos.length + 1, name: name, complete: false }];
    });
  };

  const handleClearTodos = () => {
    //should set new array
    const incompleteTodos = todos.filter((todo) => !todo.complete);
    setTodos(incompleteTodos);
  };

  const incompleteTodosLength = todos.filter((todo) => !todo.complete).length;

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Completed Todos</button>
      <div>{incompleteTodosLength} left to do</div>
    </>
  );
}

export default App;
