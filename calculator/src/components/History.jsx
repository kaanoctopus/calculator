import { motion } from 'framer-motion';

export default function History({ items, onClear }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-2 text-sm text-gray-600 h-32 overflow-y-auto bg-white shadow-inner rounded-xl mb-2"
    >
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-bold">History</h3>
        <button
          onClick={onClear}
          className="text-xs text-red-500 hover:text-red-700"
        >
          Clear
        </button>
      </div>
      {items.length === 0 ? (
        <p>No history yet.</p>
      ) : (
        items.map((item, index) => <p key={index}>{item}</p>)
      )}
    </motion.div>
  );
}
