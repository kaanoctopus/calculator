const API_BASE = "https://calcbackend.netlify.app/api";

export async function registerUser(firstName, lastName, email, password) {
  const response = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, email, password }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Registration failed");
  return data;
}

export async function loginUser(email, password) {
  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Login failed");
  localStorage.setItem("token", data.token);
  return data.token;
}

export function logoutUser() {
  localStorage.removeItem("token");
}

export async function getUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const response = await fetch(`${API_BASE}/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to fetch user");
  return data;
}
