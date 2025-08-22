import { useReducer, useState } from "react";

// 1) Reducer function: handles actions
function reducer(state, action) {
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

function TodoApp() {
  // 2) useReducer to manage todos
  const [todos, dispatch] = useReducer(reducer, []);
  const [text, setText] = useState("");

  // 3) Add new todo
  const handleAdd = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch({ type: "add", text });
    setText(""); // clear input
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h2>Todo App with useReducer</h2>
      <form onSubmit={handleAdd}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a task"
        />
        <button type="submit">Add</button>
      </form>

      <ul style={{ marginTop: 20 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ marginBottom: 8 }}>
            <span
              onClick={() => dispatch({ type: "toggle", id: todo.id })}
              style={{
                textDecoration: todo.done ? "line-through" : "none",
                cursor: "pointer"
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => dispatch({ type: "delete", id: todo.id })}
              style={{ marginLeft: 8 }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
