import { useContext } from "react";
import { GlobalProvider, GlobalContext } from "./GlobalState";

function App() {
  return (
    <GlobalProvider>
      <Navbar />
      <Dashboard />
    </GlobalProvider>
  );
}

function Navbar() {
  const { state, dispatch } = useContext(GlobalContext);

  const login = async () => {
    dispatch({ type: "LOGIN_REQUEST" });

    try {
      // Fake API call (use real fetch/axios in real apps)
      const res = await new Promise((resolve) =>
        setTimeout(() => resolve({ name: "Sai Charan" }), 1000)
      );

      dispatch({ type: "LOGIN_SUCCESS", payload: res.name });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: "Login failed!" });
    }
  };

  return (
    <nav
      style={{
        padding: 10,
        background: state.theme === "light" ? "#eee" : "#333",
        color: state.theme === "light" ? "#000" : "#fff",
      }}
    >
      <h2>🌍 My App</h2>

      {state.loading ? (
        <span>⏳ Logging in...</span>
      ) : state.user ? (
        <>
          <span>Welcome, {state.user}!</span>
          <button onClick={() => dispatch({ type: "LOGOUT" })}>Logout</button>
        </>
      ) : (
        <button onClick={login}>Login</button>
      )}

      {state.error && <span style={{ color: "red" }}>{state.error}</span>}

      <button onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
        Switch to {state.theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </nav>
  );
}

function Dashboard() {
  const { state } = useContext(GlobalContext);

  return (
    <div
      style={{
        padding: 20,
        background: state.theme === "light" ? "#fff" : "#222",
        color: state.theme === "light" ? "#000" : "#fff",
        minHeight: "200px",
      }}
    >
      <h3>Dashboard</h3>
      <p>Theme: {state.theme}</p>
      <p>User: {state.user || "Not logged in"}</p>
    </div>
  );
}

export default App;
