import { useState } from 'react';

function App() {
  const [status, setStatus] = useState("Welcome to React Pizza! 🍕");

  const getPizza = () => {
    return new Promise((resolve, reject) => {
      const delivered = Math.random() > 0.3; // 70% chance of success

      setTimeout(() => {
        if (delivered) {
          resolve("🍕 Pizza Delivered!");
        } else {
          reject("❌ Pizza Cancelled!");
        }
      }, 2000);
    });
  };

  const handleOrder = async () => {
    setStatus("⏳ Ordering your pizza...");

    try {
      const result = await getPizza();
      setStatus(result);
    } catch (error) {
      setStatus(error);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>React Pizza Order App</h1>
      <p>{status}</p>
      <button onClick={handleOrder}>Order Pizza 🍕</button>
    </div>
  );
}

export default App;
