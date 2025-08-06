import { useState } from 'react';

function App() {
  const [status, setStatus] = useState('Welcome!');

  const handleOrder = () => {
    setStatus('Order received... 🍴');

    setTimeout(() => {
      setStatus('Cooking your food... 🔥');
      
      setTimeout(() => {
        setStatus('Order ready! 🍽️ Enjoy your meal!');
      }, 300);

    }, 2000);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🍽️ React Restaurant</h1>
      <p>{status}</p>
      <button onClick={handleOrder}>Place Order</button>
    </div>
  );
}

export default App;
