import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product list
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <Router>
      <h1>🛍️ React Store</h1>
      <nav>
        {products.map((p) => (
          <Link key={p.id} to={`/product/${p.id}`} style={{ marginRight: 10 }}>
            {p.title}
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
  const { id } = useParams(); // extract product id from URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ marginTop: 20 }}>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} width={150} />
      <p>{product.description}</p>
      <strong>💲 {product.price}</strong>
    </div>
  );
}

export default App;
