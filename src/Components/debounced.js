import { useRef } from "react";

export default function useDebounced(fn, delay) {
  const timeOutRef = useRef(null);

  function debounced(...args) {
    console.log(...args);
    window.clearTimeout(timeOutRef.current);

    timeOutRef.current = window.setTimeout(() => {
      fn(...args);
    }, delay);
  }

  return debounced;
}
