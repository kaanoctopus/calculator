import { useEffect } from "react";

export default function useKeyboard(handleKeyPress) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                handleKeyPress("=");
                return;
            }

            const validKeys = "cC()0123456789/*-+.=";
            if (validKeys.includes(e.key)) {
                handleKeyPress(e.key);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyPress]);
}
