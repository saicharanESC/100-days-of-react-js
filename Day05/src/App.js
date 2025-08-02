import { useState } from 'react';

function App() {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <h1>Day 5: React Events 🎯</h1>
      <input 
        type="text" 
        placeholder="Type something..." 
        value={text}
        onChange={handleChange}
      />
      <p>You typed: <strong>{text}</strong></p>
    </div>
  );
}

export default App;
