import { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return; // skip if paused

    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // cleanup when component unmounts or isRunning changes
    return () => {
      clearInterval(timerId);
      console.log("⏱ Timer cleaned up");
    };
  }, [isRunning]); // runs whenever isRunning changes

  return (
    <div style={{ fontFamily: "monospace", textAlign: "center" }}>
      <h2>{time.toLocaleTimeString()}</h2>
      <button onClick={() => setIsRunning((prev) => !prev)}>
        {isRunning ? "Pause" : "Resume"}
      </button>
    </div>
  );
}

export default Clock;
