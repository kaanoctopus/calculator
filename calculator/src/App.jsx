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
  const { expression, result, history, handleKeyPress, handleClearHistory, loadHistory } = useCalculatorController();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useKeyboard(user ? handleKeyPress : () => {});

  useEffect(() => {
    getUser()
      .then((loggedInUser) => {
        setUser(loggedInUser);
        if (loggedInUser) {
          loadHistory();
        }
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = async () => {
    try {
      const loggedInUser = await getUser();
      setUser(loggedInUser);
      await loadHistory();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

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
          <Login onLogin={handleLogin} />
          <Register onRegister={handleLogin} />
        </>
      )}
    </div>
  );
}
