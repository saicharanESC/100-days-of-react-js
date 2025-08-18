import { useRef, useState } from "react";

function FocusInput() {
  const inputRef = useRef(null);   // Step 1: create a ref
  const countRef = useRef(0);      // Step 2: store a persistent value
  const [renderCount, setRenderCount] = useState(0);

  const handleFocus = () => {
    // Step 3: use ref to focus input
    inputRef.current.focus();
  };

  const incrementRef = () => {
    countRef.current += 1;  // updates without re-render
    console.log("Ref count:", countRef.current);
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "sans-serif" }}>
      <h2>useRef Demo</h2>
      <input ref={inputRef} placeholder="Click button to focus me" />
      <br />
      <button onClick={handleFocus} style={{ marginTop: 10 }}>
        Focus Input
      </button>
      <br />
      <button onClick={incrementRef} style={{ marginTop: 10 }}>
        Increment Ref Count (check console)
      </button>
      <br />
      <button onClick={() => setRenderCount((c) => c + 1)} style={{ marginTop: 10 }}>
        Force Re-render
      </button>
      <p>Render count: {renderCount}</p>
    </div>
  );
}

export default FocusInput;
