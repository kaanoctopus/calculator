import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function History({ items, onClear }) {
    const [height, setHeight] = useState("500px");
    for (let i = 0; i < items.length; ++i) {
        items[i] = items[i].replace(/ deg/g, "");
    }
    useEffect(() => {
        const updateHeight = () => {
            const calculator = document.querySelector("#calculator");
            if (calculator) {
                setHeight(`${calculator.clientHeight}px`);
            }
        };

        updateHeight();

        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="p-4 bg-white rounded-xl shadow-md flex flex-col"
            style={{ height }}
        >
            <div className="flex justify-between items-center mb-3 border-b pb-2">
                <h3 className="text-lg font-semibold">History</h3>
                {items.length > 0 && (
                    <motion.button
                        onClick={onClear}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 text-xs font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                    >
                        Clear All
                    </motion.button>
                )}
            </div>

            <div className="flex-1 overflow-y-auto pr-2">
                <AnimatePresence>
                    {items.length === 0 ? (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            className="text-center text-gray-400 italic pt-8"
                        >
                            Your calculations will appear here
                        </motion.p>
                    ) : (
                        <ul className="space-y-2">
                            {items.map((item, index) => (
                                <motion.li
                                    key={items.length - index - 1}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.05,
                                    }}
                                    className="px-3 py-2 bg-gray-50 rounded-lg text-gray-700 font-mono text-sm truncate"
                                >
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
