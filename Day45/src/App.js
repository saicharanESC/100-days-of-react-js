import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUsers } from "./hooks/useUsers";

const queryClient = new QueryClient();

function Users() {
  const { data, isLoading, error } = useUsers();

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>{error.message}</p>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>
          {user.name} ({user.email})
        </li>
      ))}
    </ul>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: 20 }}>
        <h2>🧩 Reusable Data Hooks with React Query</h2>
        <Users />
      </div>
    </QueryClientProvider>
  );
}

export default App;
