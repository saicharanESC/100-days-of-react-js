import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <Link to="stats">Stats</Link> |{" "}
        <Link to="settings">Settings</Link>
      </nav>

      <Routes>
        <Route path="stats" element={<Stats />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

function Stats() {
  return <h3>📊 Stats Page</h3>;
}

function Settings() {
  return <h3>⚙️ Settings Page</h3>;
}

export default App;
