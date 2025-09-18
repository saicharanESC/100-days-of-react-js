import { useAsync } from "./useAsync";

const fetchUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

function App() {
  const { data: users, loading, error, execute } = useAsync(fetchUsers);

  return (
    <div style={{ padding: 20 }}>
      <h2>👥 Users List</h2>

      <button onClick={execute} disabled={loading} style={{ marginBottom: 10 }}>
        {loading ? "Loading..." : "Load Users"}
      </button>

      {error && <p style={{ color: "red" }}>❌ {error}</p>}

      {users && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
