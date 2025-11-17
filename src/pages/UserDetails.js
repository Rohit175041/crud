import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api/api";

export default function UserDetails() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    api.getUser(id)
      .then((data) => {
        if (mounted) {
          setUser(data);
        }
      })
      .catch(() => {
        if (mounted) {
          setError("Unable to fetch this user. It may be created locally and not available on API.");
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => (mounted = false);
  }, [id]);

  if (loading) return <p className="muted">Loading user…</p>;

  if (error) {
    return (
      <div className="panel">
        <h2>Error</h2>
        <p className="error">{error}</p>
        <p>
          JSONPlaceholder does not save newly created users.  
          So this user cannot be fetched again.
        </p>
        <Link to="/">← Back to Home</Link>
      </div>
    );
  }

  return (
    <section className="panel">
      <h2>{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Website:</strong> {user.website}</p>

      <Link to="/">← Back</Link>
    </section>
  );
}
