import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

// Fetch todos
const fetchTodos = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
};

// Add todo
const addTodoApi = async (todo) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!res.ok) throw new Error("Failed to add todo");
  return res.json();
};

function App() {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  // Mutation with invalidateQueries
  const addTodoMutation = useMutation({
    mutationFn: addTodoApi,
    onSuccess: () => {
      // Automatically refetch "todos" query after mutation
      queryClient.invalidateQueries(["todos"]);
    },
  });

  const handleAdd = () => {
    if (!title.trim()) return;
    addTodoMutation.mutate({ title, completed: false });
    setTitle("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📝 Todos with invalidateQueries()</h2>

      {isLoading && <p>Loading todos...</p>}
      {error && <p style={{ color: "red" }}>{error.message}</p>}

      <ul>
        {data?.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New todo"
      />
      <button onClick={handleAdd} style={{ marginLeft: 8 }}>
        Add Todo
      </button>

      {addTodoMutation.isLoading && <p>Adding todo...</p>}
      {addTodoMutation.isError && <p style={{ color: "red" }}>Failed to add todo</p>}
      {addTodoMutation.isSuccess && <p>✅ Todo added successfully!</p>}
    </div>
  );
}

export default App;
