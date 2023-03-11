import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from 'jwt-decode' // import dependency

import { loginRequest, logoutRequest } from "api";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState();
  const [userData, setUserData] = useState();
  
  const navigate = useNavigate();

  async function login(email, password) {
    const { success, error } = await loginRequest({ email, password });
    
    if (error) {
      console.log("login request error", success);
      alert(error.message);
      return;
    } 

    const newUserData = jwt(success.accessToken);
    setAccessToken(success.accessToken)
    setUserData(newUserData);
    
    localStorage.setItem("accessToken", success.accessToken);
    localStorage.setItem("refreshToken", success.refreshToken);
    navigate("/"); 
  }

  async function logout() { 
    if (!userData) {
      alert("You are not logged in");
      return
    }

    const { success, error } = await logoutRequest({ userId: userData.userId, accessToken });
    
    if (error) {
      console.log("logout request error", success);
      alert(error.message);
      return;
    } 

    console.log("logout from auth");
    setAccessToken(null)
    setUserData(null);
    localStorage.clear();

    navigate("/login");
  }

  // function redir() {
  //   window.location.href = "/login";
  // }

  useEffect(() => {}, []);

  const value = {
    accessToken,
    userData,
    
    login,
    logout,

    setUserData,
    setAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
