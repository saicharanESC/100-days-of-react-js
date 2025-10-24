import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchTodos = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
};

function TodosOptimistic() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");

  const { data: todos = [], isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const addTodoMutation = useMutation({
    mutationFn: async (newTodo) => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });
      if (!res.ok) throw new Error("Failed to add todo");
      return res.json();
    },

    // 👇 Optimistic Update Configuration
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries(["todos"]);

      const previousTodos = queryClient.getQueryData(["todos"]);

      // Update cache immediately
      queryClient.setQueryData(["todos"], (old = []) => [
        ...old,
        { ...newTodo, id: Date.now() },
      ]);

      return { previousTodos };
    },

    onError: (err, newTodo, context) => {
      // Rollback to previous state if failed
      queryClient.setQueryData(["todos"], context.previousTodos);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTodoMutation.mutate({ title, completed: false });
    setTitle("");
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 400 }}>
      <h2>Optimistic Todo List</h2>

      <form onSubmit={handleAdd}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo..."
          style={{ padding: 8, width: "100%" }}
        />
        <button type="submit" style={{ marginTop: 8 }}>
          Add
        </button>
      </form>

      {isLoading ? (
        <p>Loading todos...</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodosOptimistic;
