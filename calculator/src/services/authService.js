import { fetchWithFallback } from '../utility/apiClient';

export async function registerUser(firstName, lastName, email, password) {
  return await fetchWithFallback('/register', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, email, password }),
  }, true);
}

export async function forgotPassword(email) {
  return await fetchWithFallback('/forgot-password', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  }, true);
}

export async function resetPassword(token, newPassword) {
  return await fetchWithFallback('/reset-password', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, newPassword }),
  }, true);
}

export async function loginUser(email, password) {
  const data = await fetchWithFallback(
    '/login',
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    },
    true // This is an auth endpoint
  );
  
  localStorage.setItem("token", data.token);
  return data.token;
}

export function logoutUser() {
  localStorage.removeItem("token");
}

export async function getUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  return await fetchWithFallback(
    '/me',
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    },
    true
  );
}

export async function updateUser(updatedData) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User not authenticated");

  return await fetchWithFallback(
    '/me',
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    },
    true
  );
}

export async function deleteUser() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User not authenticated");

  await fetchWithFallback(
    '/me',
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    },
    true
  );

  logoutUser();
}