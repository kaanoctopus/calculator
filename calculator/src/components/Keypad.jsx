import { motion } from 'framer-motion';

export default function Keypad({ onKeyPress }) {
    const keys = [
      '0', '1', '2',
      '3', '4', '5',
      '6', '7', '8',
      '9', '/', '*',
      '-', '+', '.',
      '(', ')', '=', 'c'
    ];
  
    return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-5 gap-2 p-4 bg-gray-100 rounded-b-2xl"
        >
          {keys.map((key) => (
            <motion.button
              key={key}
              whileTap={{ scale: 0.9 }}
              className="bg-white p-4 rounded-xl shadow hover:bg-gray-200 text-xl font-medium"
              onClick={() => onKeyPress(key)}
            >
              {key}
            </motion.button>
          ))}
        </motion.div>
      );
    
  }