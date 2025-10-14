import { useState } from 'react';

const initialBugs = [
  { id: 1, name: "Buggy Button" },
  { id: 2, name: "Unkeyed List" },
  { id: 3, name: "Infinite Loop" },
];

function App() {
  const [bugs, setBugs] = useState(initialBugs);

  const addBug = () => {
    const newBug = {
      id: Date.now(),
      name: `New Bug #${bugs.length + 1}`,
    };
    setBugs([...bugs, newBug]);
  };

  const removeBug = (id) => {
    setBugs(bugs.filter((bug) => bug.id !== id));
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>🐞 React Bug Tracker</h1>
      <button onClick={addBug}>Add Bug 🐛</button>
      <ul>

        {bugs.map((bug) => (

          <li key={bug.id}>
            {bug.name}
            <button onClick={() => removeBug(bug.id)} style={{ marginLeft: '1rem' }}>
              Fix
            </button>
          </li>
          
        ))}

      </ul>
    </div>
  );
}

export default App;
