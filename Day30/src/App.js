import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Suspense, lazy } from "react";

// Lazy imports (loaded only when needed)
const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));
const Profile = lazy(() => import("./Profile"));

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/profile">Profile</Link>
      </nav>

      {/* Suspense shows fallback while loading */}
      <Suspense fallback={<p>⏳ Loading...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
