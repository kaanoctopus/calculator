import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./Login";
import Register from "./Register";

export default function AuthPage({ onLogin }) {
    const [currentPage, setCurrentPage] = useState("login");

    const switchToLogin = () => setCurrentPage("login");
    const switchToRegister = () => setCurrentPage("register");

    return (
        <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
                {currentPage === "login" ? (
                    <motion.div
                        key="login"
                        initial={{ x: -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 300, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                        <Login
                            onLogin={onLogin}
                            onSwitchToRegister={switchToRegister}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="register"
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                        <Register onSwitchToLogin={switchToLogin} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
