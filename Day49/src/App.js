import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function AddTodo() {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  // Define mutation
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

    onSuccess: (data) => {
      // Update cached todos after successful mutation
      queryClient.setQueryData(["todos"], (old = []) => [...old, data]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTodoMutation.mutate({ title, completed: false });
    setTitle("");
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 400 }}>
      <h2>Add Todo (Mutation Example)</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo..."
          style={{ padding: 8, width: "100%" }}
        />
        <button type="submit" style={{ marginTop: 8 }}>
          Add
        </button>
      </form>

      {addTodoMutation.isLoading && <p>Adding...</p>}
      {addTodoMutation.isError && <p style={{ color: "red" }}>Error adding todo</p>}
      {addTodoMutation.isSuccess && <p style={{ color: "green" }}>Todo added successfully!</p>}
    </div>
  );
}

export default AddTodo;
