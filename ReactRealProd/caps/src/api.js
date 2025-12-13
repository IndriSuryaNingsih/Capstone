// src/api.js
const ENV_URL = import.meta.env.VITE_API_URL;

// kalau build di netlify (https), jangan pernah pakai localhost
const API_BASE_URL =
ENV_URL && !ENV_URL.includes("localhost")
    ? `${ENV_URL}/api`
    : "https://project-capstone-jwjz.onrender.com/api";

export async function apiFetch(path, options = {}) {
const token = localStorage.getItem("token");

const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
    },
});

const text = await res.text();
const data = text ? JSON.parse(text) : null;

if (!res.ok) throw new Error(data?.message || `Request failed: ${res.status}`);
return data;
}
