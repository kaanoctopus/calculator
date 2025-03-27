import { useState, useEffect } from 'react';
import { useCalculatorController } from './controllers/useCalculatorController';
import Display from './components/Display';
import Keypad from './components/Keypad';
import History from './components/History';
import Login from './components/Login';
import Register from './components/Register';
import useKeyboard from './hooks/useKeyboard';
import { getUser, logoutUser } from './services/authService';

export default function App() {
  const { expression, result, history, handleKeyPress, handleClearHistory } = useCalculatorController();
  useKeyboard(handleKeyPress);
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser().then(setUser).catch(() => setUser(null));
  }, []);

  return (
    <div className="max-w-sm w-full mx-auto mt-10 p-4 rounded-3xl bg-white shadow-2xl flex flex-col gap-2">
      {user ? (
        <>
          <button onClick={() => { logoutUser(); setUser(null); }}>Logout</button>
          <History items={history} onClear={handleClearHistory} />
          <Display value={result || expression} />
          <Keypad onKeyPress={handleKeyPress} />
        </>
      ) : (
        <>
          <Login onLogin={() => getUser().then(setUser)} />
          <Register onRegister={() => getUser().then(setUser)} />
        </>
      )}
    </div>
  );
}
