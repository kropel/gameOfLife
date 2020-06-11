import { useEffect, useRef } from "react";

function useInterval(callback, delay) {
  const savedCallback = useRef();
  const setCallback = (fn) => {
    callback = fn;
  };
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
  return setCallback;
}

export default useInterval;
