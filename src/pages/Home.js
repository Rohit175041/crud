// src/pages/Home.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/api";
import UserForm from "../components/UserForm";
import { toast } from "react-toastify";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users on mount
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    api.getUsers()
      .then((data) => {
        if (!mounted) return;
        setUsers(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err?.message || "Failed to load users");
        setUsers([]);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  // Create user (POST). JSONPlaceholder won't persist but returns the posted object.
  async function createUser(data) {
    try {
      const newUser = await api.createUser(data);
      // If API doesn't return an id, generate a local one so we can reference it later
      if (!newUser || newUser.id === undefined || newUser.id === null) {
        newUser.id = `local-${Date.now()}`;
      }
      setUsers((prev) => [newUser, ...(prev || [])]);
      toast.success("User created (simulated).");
    } catch (err) {
      toast.error("Failed to create user: " + (err?.message || err));
    }
  }

  // Update user (PUT). If the API fails (e.g., for a locally-created user),
  // still update the UI locally and inform the user.
  async function updateUser(id, data) {
    try {
      const updated = await api.updateUser(id, data);
      if (!updated) {
        throw new Error("No response from API");
      }
      setUsers((prev) => (prev || []).map((u) => (String(u.id) === String(id) ? updated : u)));
      setEditUser(null);
      toast.success("User updated (simulated).");
    } catch (err) {
      toast.warn(
        "Unable to update on remote API — changes applied locally."
      );
      setUsers((prev) =>
        (prev || []).map((u) => (String(u.id) === String(id) ? { ...u, ...data } : u))
      );
      setEditUser(null);
    }
  }

  // Delete user (DELETE). If API call fails, still remove from UI (simulated delete).
  async function deleteUser(id) {
    if (!window.confirm("Delete this user? This action is simulated and will remove it from view.")) {
      return;
    }

    try {
      await api.deleteUser(id);
      setUsers((prev) => (prev || []).filter((u) => String(u.id) !== String(id)));
      toast.info("User deleted (simulated).");
    } catch (err) {
      toast.warn("Failed to delete on remote API — removed locally.");
      setUsers((prev) => (prev || []).filter((u) => String(u.id) !== String(id)));
    }
  }

  if (loading) return <p className="muted">Loading users…</p>;

  return (
    <div>
      <section style={{ marginBottom: 16 }} className="panel-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <h2 style={{ margin: 0, fontSize: 18 }}>User Manager</h2>
          <div>
            <button className="button btn-muted" onClick={() => window.location.reload()}>
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div style={{ marginBottom: 12 }} className="panel-card">
            <p className="error">Error loading users: {error}</p>
            <p className="muted">You can still create, edit and delete users locally; API operations are simulated.</p>
          </div>
        )}

        <div className="grid-two" style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 18 }}>
          {/* Left: create / edit form */}
          <div className="panel-card">
            <UserForm
              initialData={editUser}
              onSubmit={(data) => (editUser ? updateUser(editUser.id, data) : createUser(data))}
              onCancel={() => setEditUser(null)}
            />
          </div>

          {/* Right: user list */}
          <div className="panel-card table-wrap">
            <table className="user-table" role="table" aria-label="Users list">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th style={{ width: 140, textAlign: "center" }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {(users || []).map((u) => (
                  <tr key={u.id} role="row">
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <Link className="link" to={`/users/${u.id}`} style={{ fontWeight: 700 }}>
                            {u.name || "—"}
                          </Link>
                          <span style={{ fontSize: 12, color: "#6b7280" }}>{u.website || ""}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div style={{ fontSize: 14 }}>{u.email || "—"}</div>
                    </td>

                    <td>
                      <div style={{ fontSize: 14 }}>{u.phone || "—"}</div>
                    </td>

                    <td style={{ textAlign: "right" }}>
                      <div className="actions" style={{ justifyContent: "flex-end" }}>
                        {/* Edit button (pencil icon) */}
                        <button
                          className="button btn-primary"
                          title="Edit"
                          onClick={() => setEditUser(u)}
                          aria-label={`Edit ${u.name}`}
                          style={{ padding: "8px 10px" }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                          </svg>
                        </button>

                        {/* Delete button (trash icon) */}
                        <button
                          className="button btn-danger"
                          title="Delete"
                          onClick={() => deleteUser(u.id)}
                          aria-label={`Delete ${u.name}`}
                          style={{ padding: "8px 10px" }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                            <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {(users || []).length === 0 && (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center", padding: 20 }}>
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
