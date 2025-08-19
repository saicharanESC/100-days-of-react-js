import { useRef } from "react";

function FocusInput() {
  const inputRef = useRef(123);

  const handleFocus = () => {
    // Access the DOM node directly
    inputRef.current.focus();
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h2>useRef Demo</h2>
      <input ref={inputRef} type="text" placeholder="Type something..." />
      <button onClick={handleFocus}>Focus the input</button>
    </div>
  );
}

export default FocusInput;
