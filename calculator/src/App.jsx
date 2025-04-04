import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCalculatorController } from "./controllers/useCalculatorController";
import Display from "./components/Display";
import Keypad from "./components/Keypad";
import History from "./components/History";
import ResetPassword from "./components/user/ResetPassword";
import UserProfile from "./components/user/UserProfile";
import AuthPage from "./components/user/AuthPage";
import useKeyboard from "./hooks/useKeyboard";
import ProfileModal from "./components/ProfileModal";
import { getUser, logoutUser, deleteUser } from "./services/authService";

export default function App() {
    const {
        expression,
        result,
        history,
        handleKeyPress,
        handleClearHistory,
        loadHistory,
    } = useCalculatorController();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState("");
    const [profileData, setProfileData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [resetToken, setResetToken] = useState(null);

    useKeyboard(user ? handleKeyPress : () => {});

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
            setResetToken(token);
            setShowResetPassword(true);
        }
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

    const handleUpdateUser = async (updatedUser) => {
        setUser(updatedUser);
        const profile = await getUser();
        setProfileData(profile);
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

    const handleGetProfile = async () => {
        try {
            const profile = await getUser();
            setProfileData(profile);
        } catch (error) {
            console.error("Failed to fetch profile:", error);
        }
    };

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm(
            "⚠️ Are you sure you want to permanently delete your account?\n\n" +
            "This will erase all your data and cannot be undone."
          );
          
          if (!confirmDelete) return;
        try {
            await deleteUser();
            logoutUser();
            setUser(null);
            setNotification("Account deleted.");
        } catch (error) {
            console.error("Failed to delete account:", error);
        }
    };

    if (loading)
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );

    if (showResetPassword) {
        return (
            <div className="max-w-md w-full mx-auto mt-10 p-6 rounded-3xl bg-white shadow-2xl">
                <ResetPassword
                    token={resetToken}
                    onSuccess={() => {
                        window.history.replaceState(
                            {},
                            document.title,
                            window.location.pathname
                        );
                        setShowResetPassword(false);
                    }}
                />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-green-500 text-white text-center p-3 rounded-lg mb-4"
                    >
                        {notification}
                    </motion.div>
                )}
            </AnimatePresence>

            {user ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center h">
                    <div className="lg:col-span-1 h-full">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="h-full"
                        >
                            <History
                                items={history}
                                onClear={handleClearHistory}
                            />
                        </motion.div>
                    </div>

                    <div className="shadow-md bg-white rounded-xl lg:col-span-1 flex justify-center items-start h-full p-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="w-full max-w-sm rounded-3xl flex flex-col h-full"
                        >
                            <h3 className="text-lg font-semibold mb-3 pb-2 border-b">Calculator</h3>
                            <Display value={result || expression} />
                            <Keypad onKeyPress={handleKeyPress} />
                        </motion.div>
                    </div>

                    <div className="lg:col-span-1 h-full">
                        <UserProfile
                            profileData={profileData}
                            onGetProfile={handleGetProfile}
                            onUpdateProfile={() => setIsModalOpen(true)}
                            onLogout={() => {
                                logoutUser();
                                setUser(null);
                            }}
                            onDeleteAccount={handleDeleteAccount}
                        />
                    </div>
                </div>
            ) : (
                <div className="max-w-md mx-auto">
                    <AuthPage onLogin={handleLogin} />
                </div>
            )}

            <AnimatePresence>
                {isModalOpen && (
                    <ProfileModal
                        user={user}
                        onClose={() => setIsModalOpen(false)}
                        onUpdate={handleUpdateUser}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
