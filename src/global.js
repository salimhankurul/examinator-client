import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from 'jwt-decode' // import dependency
import NotificationAlert from "react-notification-alert";

import { loginRequest, logoutRequest, getProfileRequest } from "api";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState();
  const [accessTokenData, setAccessTokenData] = useState();
  const [profile, setProfile] = useState();
  
  const navigate = useNavigate();
  const notificationAlertRef = React.useRef(null);

  const notify = ({ success, message }) => {
    const options = {
      place: "tr",
      message: (
        <div>
          <div>
            <b> {message} </b>
          </div>
        </div>
      ),
      type: success ? "success" : "warning",
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  }

  async function login(email, password) {
    if (accessToken) {
      alert("You are already logged in");
      return false
    }
    
    const { success, error } = await loginRequest({ email, password });
    
    if (error) {
      notify({ message: 'Error accured while trying to log in' })
      tokenExpired()
      return false
    } 

    notify({ success, message: 'Successfully Logged In !' })
    await sleep(1000)

    localStorage.setItem("accessToken", success.accessToken);
    localStorage.setItem("refreshToken", success.refreshToken);

    const _accessTokenData = jwt(success.accessToken);
    initAuth(success.accessToken, _accessTokenData)

    navigate("/"); 
    return true
  }

  async function logout() { 
    if (!accessToken) {
      alert("You are not logged in");
      return
    }

    const { success, error } = await logoutRequest({ userId: accessTokenData.userId, accessToken });
    
    if (error) {
      notify({ message: 'Error accured while trying to log out' })
    } else {
      notify({ success, message: 'Successfully logged out' })
    }

    await sleep(1000)

    tokenExpired()
  }

  function tokenExpired() {
    localStorage.clear();
    setAccessTokenData(null);
    setAccessToken(null);
    setProfile(null);

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

  return (
  <>
  <NotificationAlert ref={notificationAlertRef} />
  <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  </>
  )
}
