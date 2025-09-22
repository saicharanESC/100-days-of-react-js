import { useState, useEffect } from "react";
import { useAsync } from "./useAsync";

const fetchTodos = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
};

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Load todos from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);

  // Whenever todos change, save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const { execute: loadTodos, loading, error } = useAsync(async () => {
    const apiTodos = await fetchTodos();
    setTodos(apiTodos);
  });

  const addTodo = () => {
    if (!newTodo.trim()) return;
    const newItem = { id: Date.now(), title: newTodo, completed: false };
    setTodos((prev) => [...prev, newItem]);
    setNewTodo("");
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📌 Todo App (Persistent)</h2>

      <button onClick={loadTodos} disabled={loading}>
        {loading ? "Loading..." : "Load Todos"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {todos.length > 0 ? (
        <ul style={{ marginTop: 10 }}>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.title}{" "}
              <button onClick={() => deleteTodo(todo.id)}>❌</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No todos yet.</p>
      )}

      <div style={{ marginTop: 20 }}>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New todo..."
        />
        <button onClick={addTodo} disabled={!newTodo}>
          Add
        </button>
      </div>
    </div>
  );
}

export default App;
