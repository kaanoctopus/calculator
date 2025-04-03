const API_BASE = "https://6hkhcefyhrrnzjd3siqho25hte0lngbi.lambda-url.eu-north-1.on.aws/api/auth";

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

export async function forgotPassword(email) {
  const response = await fetch(`${API_BASE}/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to send reset email");
  return data;
}

export async function resetPassword(token, newPassword) {
  const response = await fetch(`${API_BASE}/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, newPassword }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Password reset failed");
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

export async function updateUser(updatedData) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User not authenticated");

  const response = await fetch(`${API_BASE}/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to update user");
  return data;
}

export async function deleteUser() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User not authenticated");

  const response = await fetch(`${API_BASE}/me`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error("Failed to delete user");

  logoutUser();
}
