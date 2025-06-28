// utils.jsx
import { useRef } from 'react';

export default function DoubleEnterTrigger({ onDoubleEnter }) {
  const lastPressTime = useRef(0);
  const DOUBLE_PRESS_DELAY = 300;

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      const now = Date.now();
      if (now - lastPressTime.current < DOUBLE_PRESS_DELAY) {
        onDoubleEnter?.(); // call the callback if provided
      }
      lastPressTime.current = now;
    }
  }

  return (
    <textarea
      className="editor-input"
      placeholder="Double press Enter..."
      onKeyDown={handleKeyDown}
      spellCheck={false}
    />
  );
}
