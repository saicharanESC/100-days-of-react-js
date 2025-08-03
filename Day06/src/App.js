import { useState } from 'react';

function App() {
  // 1️⃣ Declare state to track whether to show the message
  const [isVisible, setIsVisible] = useState(false);

  // 2️⃣ Toggle the value of isVisible between true and false
  const toggleMessage = () => {
    setIsVisible(!isVisible); // flips the value (true → false, false → true)
  };

  // 3️⃣ Render the UI
  return (
    <div>
      <h1>Day 6: Conditional Rendering 👀</h1>
      
      {/* 4️⃣ Button to toggle visibility */}
      <button onClick={toggleMessage}>
        {isVisible ? 'Hide' : 'Show'} Message
      </button>

      {/* 5️⃣ Show this paragraph only if isVisible is true */}
      {isVisible && <p>This is a secret message! 🔐</p>}
    </div>
  );
}

export default App;
