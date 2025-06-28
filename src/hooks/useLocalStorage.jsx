import {useEffect, useState} from "react";

export function useLocalStorage(key, defaultValue) {
  // loader for initial state
  function loadValue() {
    const stored = localStorage.getItem(key);

    if (stored !== null) {
      return JSON.parse(stored);
    }
    return defaultValue;
  }

  // react state with lazy init
  const [value, setValue] = useState(loadValue);

  // effect to persist on change
  function persist() {
    const json = JSON.stringify(value);
    localStorage.setItem(key, json);
  }
  useEffect(persist, [value]);

  return [value, setValue];
}
