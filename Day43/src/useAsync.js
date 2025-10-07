import { useReducer, useCallback } from "react";

// 1. Reducer to handle async states
function asyncReducer(state, action) {
  switch (action.type) {
    case "REQUEST":
      return { data: null, loading: true, error: null };
    case "SUCCESS":
      return { data: action.payload, loading: false, error: null };
    case "FAILURE":
      return { data: null, loading: false, error: action.payload };
    default:
      return state;
  }
}

// 2. Custom hook
export function useAsync(asyncFunction) {
  const [state, dispatch] = useReducer(asyncReducer, {
    data: null,
    loading: false,
    error: null,
  });

  // 3. Memoized execute function to trigger async calls
  const execute = useCallback(
    async (...args) => {
      dispatch({ type: "REQUEST" });
      try {
        const result = await asyncFunction(...args);
        dispatch({ type: "SUCCESS", payload: result });
      } catch (err) {
        dispatch({ type: "FAILURE", payload: err.message || "Error" });
      }
    },
    [asyncFunction]
  );

  return { ...state, execute };
}
