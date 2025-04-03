import { useState } from 'react';
import Login from './Login';
import Register from './Register';

export default function AuthPage({onLogin}) {
  const [currentPage, setCurrentPage] = useState('login');

  const switchToLogin = () => setCurrentPage('login');
  const switchToRegister = () => setCurrentPage('register');

  return (
    <div>
      {currentPage === 'login' ? (
        <Login onLogin={onLogin} onSwitchToRegister={switchToRegister} />
      ) : (
        <Register onSwitchToLogin={switchToLogin} />
      )}
    </div>
  );
}
