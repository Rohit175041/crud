const BASE = process.env.REACT_APP_API_BASE_URL;

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, options);

  if (!res.ok) {
    throw new Error(`API Error ${res.status}`);
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json();
  }

  return null;
}

export const api = {
  getUsers: () => request("/users"),
  getUser: (id) => request(`/users/${id}`),
  createUser: (data) =>
    request("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
  updateUser: (id, data) =>
    request(`/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
  deleteUser: (id) =>
    request(`/users/${id}`, {
      method: "DELETE",
    }),
};
