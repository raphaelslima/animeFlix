import React, { useState } from "react";
import useDebounce from "../debounced";

import "./style.css";

function SearchInput({ value, onChange }) {
  const [displayValue, setDisplayValue] = useState(value);
  const debouncedChange = useDebounce(onChange, 500);

  function handleOnChange(e) {
    setDisplayValue(e.target.value);
    debouncedChange(e.target.value);
  }

  return (
    <input
      type="search"
      className="input"
      placeholder="Pesquise por anime"
      value={displayValue}
      onChange={handleOnChange}
    />
  );
}

export default SearchInput;
