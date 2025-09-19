import { useState } from "react";
import { useAsync } from "./useAsync";

const fetchTodos = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
};

const addTodoApi = async (title) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, completed: false }),
  });
  if (!res.ok) throw new Error("Failed to add todo");
  return res.json();
};

const deleteTodoApi = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete todo");
  return id;
};

function App() {
  const [newTodo, setNewTodo] = useState("");

  const {
    data: todos,
    loading,
    error,
    execute: loadTodos,
  } = useAsync(fetchTodos);

  const { execute: addTodo } = useAsync(async () => {
    const added = await addTodoApi(newTodo);
    alert(`✅ Added todo: ${added.title}`);
    setNewTodo("");
    loadTodos(); // Refresh list
  });

  const { execute: deleteTodo } = useAsync(async (id) => {
    await deleteTodoApi(id);
    alert(`🗑️ Deleted todo #${id}`);
    loadTodos(); // Refresh list
  });

  return (
    <div style={{ padding: 20 }}>
      <h2>✅ Todo App</h2>

      <button onClick={loadTodos} disabled={loading}>
        {loading ? "Loading..." : "Load Todos"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {todos && (
        <ul style={{ marginTop: 10 }}>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.title}{" "}
              <button onClick={() => deleteTodo(todo.id)}>❌</button>
            </li>
          ))}
        </ul>
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
