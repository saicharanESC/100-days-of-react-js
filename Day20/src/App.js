import { useReducer } from "react";

// 1) Reducer function (defines how state changes)
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
}

function Counter() {
  // 2) useReducer takes reducer + initial state
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h2>Counter with useReducer</h2>
      <p>Count: {state.count}</p>

      {/* 3) Dispatch actions instead of directly updating state */}
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}

export default Counter;
