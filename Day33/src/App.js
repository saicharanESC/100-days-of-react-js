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

  return (
    <nav
      style={{
        padding: 10,
        background: state.theme === "light" ? "#eee" : "#333",
        color: state.theme === "light" ? "#000" : "#fff",
      }}
    >
      <h2>🌍 My App</h2>

      {state.user ? (
        <>
          <span>Welcome, {state.user}!</span>
          <button onClick={() => dispatch({ type: "LOGOUT" })}>
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={() =>
            dispatch({ type: "LOGIN", payload: "Sai Charan" })
          }
        >
          Login
        </button>
      )}

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
