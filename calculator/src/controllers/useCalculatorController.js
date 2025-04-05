import { useState, useCallback } from "react";
import {
    evaluateExpression,
    fetchHistory,
    clearHistory,
} from "../services/calculatorService";

const OPERATORS = ["+", "-", "*", "/", "="];

const isOperator = (key) => OPERATORS.includes(key);

const countChar = (str, char) =>
    (str.match(new RegExp(`\\${char}`, "g")) || []).length;

const validateEquals = (expr, lastChar) => {
    if (!expr || isOperator(lastChar)) return false;

    const hasOperator = /[+\-*/]/.test(expr);
    const openParens = countChar(expr, "(");
    const closeParens = countChar(expr, ")");
    return hasOperator && openParens === closeParens;
};

const validateClosingParen = (expr, lastChar) => {
    const open = countChar(expr, "(");
    const close = countChar(expr, ")");
    return open > close && !isOperator(lastChar) && lastChar !== "(";
};

const validateOperatorChaining = (lastChar, newKey) => {
    const isChainingAllowed =
        (lastChar === "*" || lastChar === "/") && newKey === "-";
    return !isChainingAllowed && isOperator(lastChar) && isOperator(newKey);
};

const isInvalidLeadingOperator = (expr, key) =>
    !expr && isOperator(key) && key !== "-";

const isInvalidAfterOpenParen = (lastChar, key) =>
    lastChar === "(" && isOperator(key) && key !== "-";

const validateDecimalPoint = (expr) => {
    const parts = expr.split(/[+\-*/()]/);
    const lastNum = parts[parts.length - 1];
    return !lastNum.includes(".");
};

const isValidInput = (expr, key) => {
    const lastChar = expr.slice(-1);
    if (!lastChar) return true

    if (key === "=") return validateEquals(expr, lastChar);
    if (key === ")") return validateClosingParen(expr, lastChar);
    if (validateOperatorChaining(lastChar, key)) return false;
    if (isInvalidLeadingOperator(expr, key)) return false;
    if (isInvalidAfterOpenParen(lastChar, key)) return false;
    if (key === "." && !validateDecimalPoint(expr)) return false;

    return true;
};

export function useCalculatorController() {
    const [expression, setExpression] = useState("");
    const [result, setResult] = useState("");
    const [history, setHistory] = useState([]);
    const [justCalculated, setJustCalculated] = useState(false);

    const loadHistory = useCallback(async () => {
        try {
            const { history: historyData } = await fetchHistory();
            setHistory(historyData.map((h) => `${h.expression} = ${h.result}`));
        } catch (error) {
            console.error("Failed to load history:", error);
        }
    }, []);

    const handleKeyPress = async (key) => {
        const isClear = key.toLowerCase() === "c";

        if (!isClear && !isValidInput(expression, key)) return;

        if (key === "=") {
            try {
                const res = await evaluateExpression(expression);
                setResult(res);
                setExpression("");
                setHistory([`${expression} = ${res}`, ...history]);
                setJustCalculated(true);
            } catch {
                setResult("Error");
                setExpression("");
            }
        } else if (isClear) {
            setExpression("");
            setResult("");
        } else {
            if (justCalculated) {
                const newExpr = isOperator(key) ? result + key : key;
                setExpression(newExpr);
                setJustCalculated(false);
            } else {
                setExpression((prev) => prev + key);
            }
            setResult("");
        }
    };

    const handleClearHistory = async () => {
        try {
            await clearHistory();
            setHistory([]);
        } catch (err) {
            console.error("Failed to clear history:", err);
        }
    };

    return {
        expression,
        result,
        history,
        handleKeyPress,
        handleClearHistory,
        loadHistory,
    };
}
