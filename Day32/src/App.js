import { useContext } from "react";
import { ThemeProvider, ThemeContext } from "./ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <Dashboard />
    </ThemeProvider>
  );
}

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <nav
      style={{
        padding: 10,
        background: theme === "light" ? "#eee" : "#333",
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      <h2>🌍 My App</h2>
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </nav>
  );
}

function Dashboard() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        padding: 20,
        background: theme === "light" ? "#fff" : "#222",
        color: theme === "light" ? "#000" : "#fff",
        minHeight: "200px",
      }}
    >
      <h3>Dashboard</h3>
      <p>Current theme: {theme}</p>
    </div>
  );
}

export default App;
