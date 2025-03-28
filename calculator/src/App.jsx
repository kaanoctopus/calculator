import { useState, useEffect } from 'react';
import { useCalculatorController } from './controllers/useCalculatorController';
import Display from './components/Display';
import Keypad from './components/Keypad';
import History from './components/History';
import Login from './components/Login';
import Register from './components/Register';
import useKeyboard from './hooks/useKeyboard';
import ProfileModal from "./components/ProfileModal";
import { getUser, logoutUser, deleteUser } from './services/authService';

export default function App() {
  const { expression, result, history, handleKeyPress, handleClearHistory, loadHistory } = useCalculatorController();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  }, [loadHistory]);

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser); 
  };

  const handleLogin = async () => {
    try {
      const loggedInUser = await getUser();
      setUser(loggedInUser);
      await loadHistory();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleRegister = async () => {
    setNotification("Registration successful! You can now log in.");
    setTimeout(() => setNotification(""), 3000);
  };

  const handleGetProfile = async () => {
    try {
      const profile = await getUser();
      setProfileData(profile);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser();
      logoutUser();
      setUser(null);
      setNotification("Account deleted.");
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-sm w-full mx-auto mt-10 p-4 rounded-3xl bg-white shadow-2xl flex flex-col gap-2">
      {notification && (
        <div className="bg-green-500 text-white text-center p-2 rounded-md">{notification}</div>
      )}
      {user ? (
        <>
          <button onClick={() => { logoutUser(); setUser(null); }}>Logout</button>
          <History items={history} onClear={handleClearHistory} />
          <Display value={result || expression} />
          <Keypad onKeyPress={handleKeyPress} />

          <div className="mt-4 p-2 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-bold">User Profile</h3>
            <button className="w-full p-2 bg-blue-500 text-white rounded" onClick={handleGetProfile}>Get Profile</button>
            <button className="w-full p-2 mt-2 bg-yellow-500 text-white rounded" onClick={() => setIsModalOpen(true)}>Update Profile</button>
            <button className="w-full p-2 mt-2 bg-red-500 text-white rounded" onClick={handleDeleteAccount}>Delete Account</button>

            {profileData && (
              <div className="mt-2 p-2 border rounded bg-white">
                <p><strong>Name:</strong> {profileData.firstName}</p>
                <p><strong>Surname:</strong> {profileData.lastName}</p>
                <p><strong>Email:</strong> {profileData.email}</p>
              </div>
            )}
          </div>
        
        </>
      ) : (
        <>
          <Login onLogin={handleLogin} />
          <Register onRegister={handleRegister} />
        </>
      )}
      
      {isModalOpen && (
        <ProfileModal
          user={user}
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleUpdateUser}
        />
      )}
    </div>
  );
}
