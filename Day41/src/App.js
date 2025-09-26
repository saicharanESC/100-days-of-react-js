import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const fetchTodos = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
};

const addTodoApi = async (newTodo) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
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
  const queryClient = useQueryClient();

  // Fetch todos
  const { data: todos, error, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  // Mutation: add with optimistic update
  const addMutation = useMutation({
    mutationFn: addTodoApi,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries(["todos"]);

      const previousTodos = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(["todos"], (old) => [
        ...(old || []),
        { id: Date.now(), ...newTodo }, // temporary todo
      ]);

      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["todos"], context.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  // Mutation: delete with optimistic update
  const deleteMutation = useMutation({
    mutationFn: deleteTodoApi,
    onMutate: async (id) => {
      await queryClient.cancelQueries(["todos"]);

      const previousTodos = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(["todos"], (old) =>
        old.filter((todo) => todo.id !== id)
      );

      return { previousTodos };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["todos"], context.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  const handleAdd = () => {
    if (!newTodo.trim()) return;
    addMutation.mutate({ title: newTodo, completed: false });
    setNewTodo("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📌 Todo App with Optimistic Updates</h2>

      {isLoading && <p>Loading todos...</p>}
      {error && <p style={{ color: "red" }}>{error.message}</p>}

      {todos && (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.title}{" "}
              <button onClick={() => deleteMutation.mutate(todo.id)}>❌</button>
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
        <button onClick={handleAdd} disabled={addMutation.isLoading}>
          {addMutation.isLoading ? "Adding..." : "Add"}
        </button>
      </div>
    </div>
  );
}

export default App;
