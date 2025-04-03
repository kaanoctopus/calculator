import { useState, useEffect } from "react";
import { loginUser } from "../../services/authService";

export default function Login({ onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      setLoading(true)
      await loginUser(email, password);
      onLogin();
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false)
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setResetSuccess(null);
    try {
      // await resetPassword(resetEmail);
      setResetSuccess("Check your email for reset instructions.");
      setResetEmail("");
    } catch (err) {
      setResetSuccess("Error sending reset email.");
    }
  };

  return (
    <div className="w-full max-w-md bg-white">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Sign in to your account
        </h1>

        {errorMessage && (
          <div className="p-2 text-sm text-red-600 bg-red-100 rounded-lg">
            {errorMessage}
          </div>
        )}

        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div
            className="text-sm text-right font-medium text-green-400 hover:underline cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            Forgot password?
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300'
            }`}     >
        {loading ? (
                    <div className="text-center">
                    <div role="status">
                        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
        ) : (
          'Sign in'
        )}
          </button>
          <div className="text-sm text-center">
          <span>Don't have an account? </span>
          <button
            onClick={onSwitchToRegister}
            className="font-medium text-green-400 hover:underline"
          >
            Create an account
          </button>
        </div>
        </form>
      </div>

      {/* Forgot Password Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Reset Password</h2>
            {resetSuccess && (
              <div className="p-2 text-sm text-green-600 bg-green-100 rounded-lg">
                {resetSuccess}
              </div>
            )}
            <form onSubmit={handlePasswordReset}>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Enter your email
              </label>
              <input
                type="email"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600"
                placeholder="name@company.com"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
