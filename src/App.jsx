import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewTodo, fetchTodos } from "./store/todoSlice";
import NewTodoForm from "./components/NewTodoForm";
import TodoList from "./components/TodoList";

import "./App.css";

function App() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.todos);

  const handleAction = () => {
    if (text.trim().length) {
      dispatch(addNewTodo(text));
      setText("");
    }
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <div className="App">
      <NewTodoForm
        value={text}
        updateText={setText}
        handleAction={handleAction}
      />
      {status === "loading" && <h2>Loading...</h2>}
      {error && <h2>Error: {error}</h2>}
      <TodoList />
    </div>
  );
}

export default App;
