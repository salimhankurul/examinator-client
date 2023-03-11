import React, { useContext, useEffect, useState } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import LoginPage from "./pages/auth-login";
import ResetPassword from "./pages/auth-reset-password";

import DashboardLayout from "./pages/Dashboard";
import ProfileLayout from "./pages/UserProfile";

import { AuthProvider } from "./auth";

const root = ReactDOM.createRoot(document.getElementById("root"));

function PrivateRoute({ children }) {

  const currentUser = sessionStorage.getItem("user");

  console.log("sessionStorage user", currentUser);

  return currentUser ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/reset-password" element={<ResetPassword />} />

        <Route exact path="/" element={<PrivateRoute><DashboardLayout/></PrivateRoute>} />
        <Route exact path="/profile" element={<PrivateRoute><ProfileLayout/></PrivateRoute>} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
  )
}

root.render(
  App()
)
