import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";

function App() {
  const products = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Phone" },
    { id: 3, name: "Headphones" },
  ];

  return (
    <Router>
      <h1>🛒 Product Store</h1>
      <nav>
        {products.map((p) => (
          <Link key={p.id} to={`/product/${p.id}`} style={{ marginRight: 10 }}>
            {p.name}
          </Link>
        ))}
      </nav>

      <Routes>
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

function ProductDetail() {
  const { id } = useParams(); // Extracts ":id" from URL
  return <h2>📦 Showing details for Product ID: {id}</h2>;
}

export default App;
