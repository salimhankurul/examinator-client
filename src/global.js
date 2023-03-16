import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from 'jwt-decode' // import dependency

import { loginRequest, logoutRequest, getProfileRequest } from "api";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState();
  const [accessTokenData, setAccessTokenData] = useState();
  const [profile, setProfile] = useState();
  
  const navigate = useNavigate();

  async function login(email, password) {
    if (accessToken) {
      alert("You are already logged in");
      return
    }
    
    const { success, error } = await loginRequest({ email, password });
    
    if (error) {
      if (error.status === 403) {
        console.log("loginRequest error 403, redirect to login")
        tokenExpired()
        return
      }
      console.log("login request error", success);
      return;
    } 
    
    localStorage.setItem("accessToken", success.accessToken);
    localStorage.setItem("refreshToken", success.refreshToken);

    const _accessTokenData = jwt(success.accessToken);
    initAuth(success.accessToken, _accessTokenData)

    navigate("/"); 
  }

  async function logout() { 
    if (!accessToken) {
      alert("You are not logged in");
      return
    }

    const { success, error } = await logoutRequest({ userId: accessTokenData.userId, accessToken });
    
    if (error) {
      console.log("logout request error", error);
    } else {
      console.log("logout request success", success);
    }

    tokenExpired()
  }

  function tokenExpired() {
    console.log("tokenExpired called")
    localStorage.clear();
    setAccessTokenData(null)
    setAccessToken(null)
    setProfile(null)
    navigate("/login");
  }

  function initAuth(accessToken, accessTokenData) {
    setAccessToken(accessToken)
    setAccessTokenData(accessTokenData)

    const getProfile = async (accessToken) => {
      const { success, error } = await getProfileRequest({ accessToken });
      if (error) {
        if (error.status === 403) {
          tokenExpired()
          return
        }
        return
      } 
      setProfile(success.data);
    };
    getProfile(accessToken);
  }

  const value = {
    accessToken,
    accessTokenData,
    profile,
    
    login,
    logout,
    tokenExpired,
    initAuth,
    
    setAccessToken,
    setAccessTokenData,
    setProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
