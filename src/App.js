// src/App.js
import React from "react";
import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <AppRouter />
      {/* ToastContainer can be customized; position, autoClose, theme, etc */}
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}
