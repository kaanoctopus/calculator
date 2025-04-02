const API_BASE = "https://6hkhcefyhrrnzjd3siqho25hte0lngbi.lambda-url.eu-north-1.on.aws/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
};

export async function evaluateExpression(expression) {
  const response = await fetch(`${API_BASE}/calculate`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ expression }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Calculation error");
  return data.result;
}

export async function fetchHistory() {
  const response = await fetch(`${API_BASE}/history`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to fetch history");
  return data;
}

export async function clearHistory() {
  const response = await fetch(`${API_BASE}/history`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Failed to clear history");
}
