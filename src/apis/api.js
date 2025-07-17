export const BASE_URL = "http://localhost:3000";

export async function apiRequest(
  endpoint,
  { method = "POST", body, token } = {}
) {
  const headers = {
    "Content-Type": "application/json",
  };
  if (!token) {
    token = localStorage.getItem("token");
  }
  headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  // Handle non-JSON responses (like HTML error pages)
  const contentType = res.headers.get("content-type");
  let data;
  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  } else {
    data = { message: await res.text() };
  }
  if (!res.ok) throw data;
  return data;
}

// Utility methods for common HTTP verbs
export function get(endpoint, token) {
  return apiRequest(endpoint, { method: "GET", token });
}

export function post(endpoint, body, token) {
  return apiRequest(endpoint, { method: "POST", body, token });
}

export function put(endpoint, body, token) {
  return apiRequest(endpoint, { method: "PUT", body, token });
}

export function patch(endpoint, body, token) {
  return apiRequest(endpoint, { method: "PATCH", body, token });
}

export function del(endpoint, token) {
  return apiRequest(endpoint, { method: "DELETE", token });
}
