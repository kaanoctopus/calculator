import { useState } from 'react';
import { evaluateExpression } from '../services/calculatorService';

export function useCalculatorController() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [justCalculated, setJustCalculated] = useState(false);

  const isOperator = (key) => ['+', '-', '*', '/'].includes(key);

  const handleKeyPress = async (key) => {
    if (key === '=') {
      try {
        const res = await evaluateExpression(expression);
        setResult(res);
        setHistory([`${expression} = ${res}`, ...history]);
        setJustCalculated(true);
      } catch (err) {
        setResult('Error');
      }
    } else {
      if (justCalculated) {
        if (isOperator(key)) {
          setExpression(result + key);
        } else {
          setExpression(key);
        }
        setResult('');
        setJustCalculated(false);
      } else {
        setExpression((prev) => prev + key);
      }
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return {
    expression,
    result,
    history,
    handleKeyPress,
    handleClearHistory,
  };
}
