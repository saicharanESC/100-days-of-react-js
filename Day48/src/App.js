import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const fetchTodos = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
};

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

  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const addTodoMutation = useMutation({
    mutationFn: addTodoApi,
    onSuccess: (newTodo) => {
      // Update cache manually instead of refetching
      queryClient.setQueryData(["todos"], (oldTodos) => [
        ...(oldTodos || []),
        { ...newTodo, id: Date.now() },
      ]);
    },
  });

  const handleAdd = () => {
    if (!title.trim()) return;
    addTodoMutation.mutate({ title, completed: false });
    setTitle("");
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>⚡ Todos with setQueryData()</h2>

      <ul>
        {todos?.map((todo) => (
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

      {addTodoMutation.isSuccess && <p>✅ Added instantly!</p>}
    </div>
  );
}

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}
