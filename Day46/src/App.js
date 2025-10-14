import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

// Fetch existing users
const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

// Add new user
const addUser = async (newUser) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  if (!res.ok) throw new Error("Failed to add user");
  return res.json();
};

function Users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const queryClient = useQueryClient();

  // Mutation for adding users
  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: (newUser) => {
      // Update cache after adding a user
      queryClient.setQueryData(["users"], (oldData) => [...oldData, newUser]);
    },
  });

  const [name, setName] = useState("");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error.message}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h3>👥 User List</h3>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <div style={{ marginTop: 20 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter new user name"
        />
        <button
          onClick={() => {
            mutation.mutate({ name });
            setName("");
          }}
          style={{ marginLeft: 8 }}
        >
          Add User
        </button>
      </div>

      {mutation.isPending && <p>Adding user...</p>}
      {mutation.isSuccess && <p>✅ User added successfully!</p>}
      {mutation.isError && <p style={{ color: "red" }}>❌ Error adding user</p>}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Users />
    </QueryClientProvider>
  );
}

export default App;
