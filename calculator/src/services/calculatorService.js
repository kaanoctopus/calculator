import { fetchWithFallback, getAuthHeaders } from "../utility/apiClient";

export async function evaluateExpression(expression) {
    const data = await fetchWithFallback("/calculate", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ expression }),
    });
    return data.result;
}

export async function fetchHistory() {
    return await fetchWithFallback("/history", {
        method: "GET",
        headers: getAuthHeaders(),
    });
}

export async function clearHistory() {
    await fetchWithFallback("/history", {
        method: "DELETE",
        headers: getAuthHeaders(),
    });
}
