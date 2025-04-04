import { useState, useCallback } from "react";
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

  const loadHistory = useCallback(async () => {
    try {
      const historyData = await fetchHistory();
      setHistory(
        historyData.history.map((h) => `${h.expression} = ${h.result}`)
      );
    } catch (error) {
      console.error("Failed to load history:", error);
    }
  }, []);

  const isOperator = (key) => ["+", "-", "*", "/"].includes(key);

  const isValidInput = (currentExpression, newKey) => {
    const lastChar = currentExpression.slice(-1);
    if (!lastChar) return true;
    
    if (!currentExpression && isOperator(newKey) && newKey !== '-') {
      return false;
    }
  
    if (isOperator(lastChar) && isOperator(newKey)) {
      if (lastChar === '*' && newKey === '-') return true;
      if (lastChar === '/' && newKey === '-') return true;
      return false;
    }
  
    if (lastChar === '(' && isOperator(newKey) && newKey !== '-') {
      return false;
    }
  
    if (newKey === '.') {
      const parts = currentExpression.split(/[+\-*/]/);
      const lastNumber = parts[parts.length - 1];
      if (lastNumber.includes('.')) return false;
    }
  
    return true;
  };

  const handleKeyPress = async (key) => {
    if (key !== '=' && key !== 'c' && key !== 'C' && !isValidInput(expression, key)) {
      return;
    }
    if (key === "=") {
      try {
        const res = await evaluateExpression(expression);
        setResult(res);
        setExpression("");
        setHistory([`${expression} = ${res}`, ...history]);
        setJustCalculated(true);
      } catch (err) {
        setResult("Error");
      setExpression("");
      }
    } else if (key === "c" || key === "C") {
      setResult("");
      setExpression("");
    } else {
      console.log(justCalculated)
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
      setResult("");

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
