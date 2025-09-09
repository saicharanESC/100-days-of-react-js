import { useContext } from "react";
import { UserProvider, UserContext } from "./UserContext";

function App() {
  return (
    <UserProvider>
      <Navbar />
      <Dashboard />
    </UserProvider>
  );
}

function Navbar() {
  const { user } = useContext(UserContext); // 3. Consume context
  return <h2>👋 Hello, {user.name}</h2>;
}

function Dashboard() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <h3>Dashboard</h3>
      <p>Status: {user.loggedIn ? "Logged In ✅" : "Logged Out ❌"}</p>
      <button onClick={() => setUser({ ...user, loggedIn: !user.loggedIn })}>
        Toggle Login
      </button>
    </div>
  );
}

export default App;
