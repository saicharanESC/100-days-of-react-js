import { createContext, useContext, useReducer, useState } from "react";

// 1) Reducer function
function todoReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, { id: Date.now(), text: action.text, done: false }];
    case "toggle":
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "delete":
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
}

// 2) Create Context
const TodoContext = createContext();

// 3) Provider component (wraps the app)
function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(todoReducer, []);
  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

// 4) Custom hook (for easy access)
function useTodos() {
  return useContext(TodoContext);
}

// 5) Components consuming global state
function TodoInput() {
  const { dispatch } = useTodos();
  const [text, setText] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch({ type: "add", text });
    setText("");
  };

  return (
    <form onSubmit={handleAdd}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add todo"
      />
      <button type="submit">Add</button>
    </form>
  );
}

function TodoList() {
  const { todos, dispatch } = useTodos();
  return (
    <ul style={{ marginTop: 20 }}>
      {todos.map(todo => (
        <li key={todo.id}>
          <span
            onClick={() => dispatch({ type: "toggle", id: todo.id })}
            style={{
              textDecoration: todo.done ? "line-through" : "none",
              cursor: "pointer"
            }}
          >
            {todo.text}
          </span>
          <button onClick={() => dispatch({ type: "delete", id: todo.id })}>
            ❌
          </button>
        </li>
      ))}
    </ul>
  );
}

// 6) Root App
function App() {
  return (
    <TodoProvider>
      <h2>Global Todo App (useReducer + useContext)</h2>
      <TodoInput />
      <TodoList />
    </TodoProvider>
  );
}

export default App;
