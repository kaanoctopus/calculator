import { useState, useCallback } from "react";
import {
    evaluateExpression,
    fetchHistory,
    clearHistory,
} from "../services/calculatorService";

const OPERATORS = ["+", "-", "*", "/", "="];
const SPECIAL_FUNCTIONS = ["sin", "cos", "tan", "sqrt", "log"];
const POST_OPERATORS = ["!", "^"];

const isOperator = (key) => OPERATORS.includes(key);
const isSpecialFunction = (key) => SPECIAL_FUNCTIONS.includes(key);
const isPostOperator = (key) => POST_OPERATORS.includes(key);

const countChar = (str, char) =>
    (str.match(new RegExp(`\\${char}`, "g")) || []).length;

const transformSpecialInput = (key) => {
    const transformations = {
        sin: "sin(",
        cos: "cos(",
        tan: "tan(",
        "√": "sqrt(",
        log: "log(",
        π: "pi",
    };
    return transformations[key] || key;
};

const transformForEvaluation = (expr) => {
    const addDegToFunction = (funcName, input) => {
        return `${funcName}(${transformForEvaluation(input)} deg)`;
    };

    let stack = [];
    let result = '';
    let i = 0;

    while (i < expr.length) {
        if (expr[i] === 's' || expr[i] === 'n') {
            let funcName = expr[i];
            if (expr[i + 1] === '(') {
                stack.push({ func: funcName, start: i });
                i += 2;
                let count = 1;
                let inner = '';

                while (i < expr.length && count > 0) {
                    if (expr[i] === '(') count++;
                    else if (expr[i] === ')') count--;

                    if (count > 0) inner += expr[i];
                    i++;
                }

                const transformed = addDegToFunction(funcName, inner);
                result += transformed;
            } else {
                result += expr[i];
                i++;
            }
        } else {
            result += expr[i];
            i++;
        }
    }
    return result;
};


const validateEquals = (expr, lastChar) => {
    if (!expr || isOperator(lastChar)) return false;

    const hasValidContent = expr.length > 0;
    const openParens = countChar(expr, "(");
    const closeParens = countChar(expr, ")");
    return hasValidContent && openParens === closeParens;
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
    !expr &&
    isOperator(key) | isSpecialFunction(key) | isPostOperator(key) &&
    key !== "-";

const isInvalidAfterOpenParen = (lastChar, key) =>
    lastChar === "(" && isOperator(key) && key !== "-";

const validateDecimalPoint = (expr) => {
    const parts = expr.split(/[+\-*/()^!]/);
    const lastNum = parts[parts.length - 1];
    return !lastNum.includes(".");
};

const validatePostOperator = (expr) => {
    const lastChar = expr.slice(-1);
    return /[0-9)]/.test(lastChar);
};

const isValidInput = (expr, key) => {
    const lastChar = expr.slice(-1);
    if (!lastChar && !isOperator(key)) return true;

    if (key === "=") return validateEquals(expr, lastChar);
    if (key === ")") return validateClosingParen(expr, lastChar);
    if (validateOperatorChaining(lastChar, key)) return false;
    if (isInvalidLeadingOperator(expr, key)) return false;
    if (isInvalidAfterOpenParen(lastChar, key)) return false;
    if (key === "." && !validateDecimalPoint(expr)) return false;
    if (isPostOperator(key) && !validatePostOperator(expr)) return false;

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

        const transformedKey = transformSpecialInput(key);

        if (key === "=") {
            try {
                const transformedExpr = transformForEvaluation(expression);
                const res = await evaluateExpression(transformedExpr);
                setResult(res);
                setExpression(res);
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
                const newExpr =
                    isOperator(key) || isPostOperator(key)
                        ? result + transformedKey
                        : transformedKey;
                setExpression(newExpr);
                setJustCalculated(false);
            } else {
                setExpression((prev) => prev + transformedKey);
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
