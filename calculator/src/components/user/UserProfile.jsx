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
            className="p-4 bg-white rounded-xl shadow-md h-full"
        >
            <h3 className="text-lg font-semibold mb-3 border-b pb-2">User Profile</h3>

            <div className="space-y-3 mb-4 ">
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
                    className="w-full p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                    onClick={onUpdateProfile}
                >
                    Update Profile
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
                    onClick={onLogout}
                >
                    Logout
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                    onClick={onDeleteAccount}
                >
                    Delete Account
                </motion.button>
            </div>

            {profileData && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="p-5 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex items-center mb-4">

      <h3 className="text-lg font-semibold text-gray-800">Profile Details</h3>
    </div>
    
    <div className="space-y-2">
      <div className="flex border-b border-gray-100 pb-3">
        <span className="w-[80px] font-medium text-gray-500">Name</span>
        <span className="flex-1 text-gray-800">{profileData.firstName}</span>
      </div>
      
      <div className="flex border-b border-gray-100 pb-3">
        <span className="w-[80px] font-medium text-gray-500">Surname</span>
        <span className="flex-1 text-gray-800">{profileData.lastName}</span>
      </div>
      
      <div className="flex">
        <span className="w-[80px] font-medium text-gray-500">Email</span>
        <span className="flex-1 text-blue-600">{profileData.email}</span>
      </div>
    </div>
    
  </motion.div>
)}
        </motion.div>
    );
}
