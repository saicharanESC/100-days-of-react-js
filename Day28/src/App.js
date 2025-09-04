import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/profile">Profile</Link>
      </nav>

      <button onClick={() => setIsLoggedIn(!isLoggedIn)} style={{ marginLeft: 10 }}>
        {isLoggedIn ? "Logout" : "Login"}
      </button>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

function Home() {
  return <h2>🏠 Home Page</h2>;
}

function Profile() {
  return <h2>👤 Welcome to your profile</h2>;
}

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default App;
