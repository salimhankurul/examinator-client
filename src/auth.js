import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = React.createContext()

export function useAuth() {
    console.log("useAuth");
    return useContext(AuthContext)
}

export function AuthProvider( {children} ) {
    const [currentUser, setCurrentUser] = useState()
    const navigate = useNavigate();
    async function signup(email, password) {
    }

    function verifyEmail() {   
    }

    function login (email, password) {   
        console.log("login from auth");
        setCurrentUser(email)
        
        sessionStorage.setItem("user", email);
        
        navigate("/")
    }
    
    function logOut() { 
        console.log("logout from auth") 
        setCurrentUser(null)
        sessionStorage.clear();
        navigate("/login")
    }
    
    function resetPassword(email) {     
    }

    function updateEmail(email) {
    }

    function updatePassword(password) {
    }

    function redir() {
        window.location.href = "/login"
    }

    
    useEffect(() => { 
    }, [])
    

    const value = {
        currentUser,
        login,
        signup,
        logOut,
        resetPassword,
        updateEmail,
        updatePassword
    }

  return (
    <AuthContext.Provider value={value}>
         { children } 
    </AuthContext.Provider>
  )
}