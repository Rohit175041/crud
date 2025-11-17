import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import UserDetails from "../pages/UserDetails";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  return (
    <>
      <header className="topbar">
        <div className="container">
          <Link to="/" className="brand">
            User Manager
          </Link>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
