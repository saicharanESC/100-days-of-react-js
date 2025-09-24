import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchTodos = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
  if (!res.ok) throw new Error("Network error");
  return res.json();
};

function App() {
  const [newTodo, setNewTodo] = useState("");

  // useQuery handles data fetching, loading, error, and caching
  const { data: todos, error, isLoading, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 1000 * 60, // cache for 1 minute
  });

  const addTodo = () => {
    if (!newTodo.trim()) return;
    // Normally we'd send this to a backend API
    console.log("New Todo:", newTodo);
    setNewTodo("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📌 Todo App with React Query</h2>

      <button onClick={() => refetch()}>🔄 Refetch Todos</button>

      {isLoading && <p>Loading todos...</p>}
      {error && <p style={{ color: "red" }}>{error.message}</p>}

      {todos && (
        <ul style={{ marginTop: 10 }}>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: 20 }}>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
    </div>
  );
}

export default App;
