import { useState } from "react";
import {
  evaluateExpression,
  fetchHistory,
  clearHistory,
} from "../services/calculatorService";

export function useCalculatorController() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [justCalculated, setJustCalculated] = useState(false);

  const loadHistory = async () => {
    try {
      const historyData = await fetchHistory();
      setHistory(historyData.history.map(h => `${h.expression} = ${h.result}`));
    } catch (error) {
      console.error("Failed to load history:", error);
    }
  };

  const isOperator = (key) => ["+", "-", "*", "/"].includes(key);

  const handleKeyPress = async (key) => {
    if (key === "=") {
      try {
        const res = await evaluateExpression(expression);
        setResult(res);
        setExpression("");
        setHistory([`${expression} = ${res}`, ...history]);
        setJustCalculated(true);
      } catch (err) {
        setResult("Error");
      }
    } else if (key === "c" || key === "C") {
      setResult("");
      setExpression("");
    } else {
      if (justCalculated) {
        if (isOperator(key)) {
          setExpression(result + key);
        } else {
          setExpression(key);
        }
        setResult("");
        setJustCalculated(false);
      } else {
        setExpression((prev) => prev + key);
      }
    }
  };

  const handleClearHistory = async () => {
    try {
      await clearHistory();
      setHistory([]);
    } catch (err) {
      console.error("Failed to clear history:", err);
    }
  };

  return {
    expression,
    result,
    history,
    handleKeyPress,
    handleClearHistory,
    loadHistory,
  };
}
