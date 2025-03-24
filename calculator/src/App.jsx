import { useEffect, useState } from 'react';
import Display from './components/Display';
import Keypad from './components/Keypad';
import History from './components/History';

export default function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [justCalculated, setJustCalculated] = useState(false);


  const isOperator = (key) => ['+', '-', '*', '/'].includes(key);

  const handleKeyPress = async (key) => {
    if (key === '=') {
      try {
        const res = await fetch('http://localhost:5000/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ expression }),
        });
        const data = await res.json();
        setResult(data.result);
        setHistory([`${expression} = ${data.result}`, ...history]);
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

  const handleKeyDown = (e) => {
    const validKeys = '()0123456789/*-+.=Enter';
    if (validKeys.includes(e.key)) {
      handleKeyPress(e.key === 'Enter' ? '=' : e.key);
    }
  };


  const handleClearHistory = () => {
    setHistory([]);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expression, justCalculated]);

  return (
    <div className="max-w-sm w-full mx-auto mt-10 p-4 rounded-3xl bg-white shadow-2xl flex flex-col gap-2">
      <History items={history} onClear={handleClearHistory} />
      <Display value={result || expression} />
      <Keypad onKeyPress={handleKeyPress} />
    </div>
  );
}