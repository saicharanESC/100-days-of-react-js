import { useAsync } from "./useAsync";

function App() {
  const loginApi = async () => {
    // Simulate API call
    return new Promise((resolve) =>
      setTimeout(() => resolve({ name: "Sai Charan" }), 1000)
    );
  };

  const { data, loading, error, execute } = useAsync(loginApi);

  return (
    <div style={{ padding: 20 }}>
      <h2>🔑 Login with Custom Hook</h2>

      {loading && <p>⏳ Logging in...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && <p>✅ Welcome, {data.name}!</p>}

      {!data && (
        <button onClick={execute} disabled={loading}>
          Login
        </button>
      )}
    </div>
  );
}

export default App;
