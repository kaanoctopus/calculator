import { motion } from "framer-motion";

export default function UserProfile({
    profileData,
    onGetProfile,
    onUpdateProfile,
    onLogout,
    onDeleteAccount,
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="p-4 bg-gray-50 rounded-xl shadow-sm"
        >
            <h2 className="text-lg font-semibold mb-4">User Profile</h2>

            <div className="space-y-3 mb-4">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    onClick={onGetProfile}
                >
                    Get Profile
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
                    onClick={onUpdateProfile}
                >
                    Update Profile
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                    onClick={onLogout}
                >
                    Logout
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors"
                    onClick={onDeleteAccount}
                >
                    Delete Account
                </motion.button>
            </div>

            {profileData && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="p-4 bg-white rounded-lg border border-gray-200"
                >
                    <h3 className="font-semibold mb-2">Profile Details</h3>
                    <div className="space-y-2">
                        <p>
                            <span className="font-medium">Name:</span>{" "}
                            {profileData.firstName}
                        </p>
                        <p>
                            <span className="font-medium">Surname:</span>{" "}
                            {profileData.lastName}
                        </p>
                        <p>
                            <span className="font-medium">Email:</span>{" "}
                            {profileData.email}
                        </p>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
