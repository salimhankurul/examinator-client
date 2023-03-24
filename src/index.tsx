import React, { useContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/animate.min.css'
import './assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0'
import './assets/css/demo.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import LoginPage from './pages/auth-login'
import ForgotPassword from './pages/auth-forgot-password'
import ResetPassword from './pages/auth-reset-password'

import DashboardLayout from './pages/Dashboard'
import ProfileLayout from './pages/user-profile'
import ExamsLayout from './pages/user-exams'

import { AuthProvider } from './global'

import { useAuth } from './global'
import jwt from 'jwt-decode' // import dependency
import { TokenMetaData } from './back-types'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

function PrivateRoute({ children }: any) {
  const { accessToken: accessTokenAuth, privateRouteRefreshInit, terminateSession } = useAuth()

  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    console.log('localStorage::accessToken is null, redirect to login')
    return <Navigate to="/login" />
  }

  const accessTokenData = jwt(accessToken) as TokenMetaData

  // check exp is expired
  if (accessTokenData.exp < Date.now() / 1000) {
    console.log('localStorage::accessToken is expired, redirect to login')
    terminateSession()
  }

  console.log('PrivateRoute::accessToken', accessToken, accessTokenData)

  if (!accessTokenAuth) {
    console.log('useAuth::auth is null, set it')
    privateRouteRefreshInit(accessToken, accessTokenData)
    return <Navigate to="/" />
  }

  return children
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          />
          <Route
            path="/exams"
            element={
              <PrivateRoute>
                <ExamsLayout />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfileLayout />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

root.render(App())
