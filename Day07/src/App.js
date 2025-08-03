function App() {
  // 1️⃣ Sample array of items to display
  const languages = ['JavaScript', 'Python', 'Go', 'Rust', 'Java','TypeScript'];

  return (
    <div>
      <h1>Day 7: Rendering Lists 🧾</h1>

      {/* 2️⃣ Map through each item and return an <li> element */}
      <ul>
        {languages.map((language, index) => (
          <li key={index}>{language}</li> // key is required for React's internal tracking
        ))}
      </ul>
    </div>
  );
}

export default App;
