import { useEffect } from "react";

export default function useKeyboard(handleKeyPress) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const validKeys = "cC()0123456789/*-+.=";
      if (validKeys.includes(e.key) || e.key === "Enter") {
        handleKeyPress(e.key === "Enter" ? "=" : e.key);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyPress]);
}
