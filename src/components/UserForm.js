import React, { useEffect, useState } from "react";

export default function UserForm({ initialData, onSubmit, onCancel }) {
  const empty = { name: "", email: "", phone: "", website: "" };
  const [form, setForm] = useState(empty);

  // Always reset or prefill the form whenever initialData changes.
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        website: initialData.website || "",
      });
    } else {
      // if no initialData, clear the form (create mode)
      setForm(empty);
    }
  }, [initialData]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Basic validation (optional)
    if (!form.name.trim()) return alert("Name is required");
    if (!form.email.trim()) return alert("Email is required");

    // Support both sync and async onSubmit handlers.
    Promise.resolve(onSubmit(form))
      .then(() => {
        // If we are in create mode (no initialData), clear the form after submit
        if (!initialData) {
          setForm(empty);
        }
        // If editing, the parent is expected to clear initialData (which will also
        // trigger the useEffect above and reset/clear the form).
      })
      .catch((err) => {
        // show friendly error (parent may also show errors)
        console.error("Submit failed:", err);
        alert("Failed to submit form: " + (err?.message || err));
      });
  }

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h3>{initialData ? "Edit User" : "Create User"}</h3>

      <label>Name</label>
      <input name="name" value={form.name} onChange={handleChange} />

      <label>Email</label>
      <input name="email" value={form.email} onChange={handleChange} />

      <label>Phone</label>
      <input name="phone" value={form.phone} onChange={handleChange} />

      <label>Website</label>
      <input name="website" value={form.website} onChange={handleChange} />

      <div className="form-actions">
        <button type="submit">{initialData ? "Update" : "Create"}</button>
        {initialData && (
          <button type="button" onClick={onCancel} className="muted">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
