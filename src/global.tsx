import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt from 'jwt-decode' // import dependency
import NotificationAlert from 'react-notification-alert'

import { loginRequest, logoutRequest, getProfileRequest } from './api'
import { Profile, TokenData } from './types'

const AuthContext = React.createContext({})

export function useAuth() {
  return useContext(AuthContext)
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function AuthProvider({ children }: any) {
  const [accessToken, setAccessToken] = useState<string | null>()
  const [accessTokenData, setAccessTokenData] = useState<TokenData | null>()
  const [profile, setProfile] = useState<Profile | null>()

  const navigate = useNavigate()
  const notificationAlertRef = React.useRef<any>(null)

  const notify = ({ success, message }: { success?: string; message: string }) => {
    const options = {
      place: 'tr',
      message: (
        <div>
          <div>
            <b> {message} </b>
          </div>
        </div>
      ),
      type: success ? 'success' : 'warning',
      icon: 'nc-icon nc-bell-55',
      autoDismiss: 7,
    }
    notificationAlertRef.current.notificationAlert(options)
  }

  async function login(email: string, password: string) {
    if (accessToken) {
      alert('You are already logged in')
      return false
    }

    const { success, error } = await loginRequest({ email, password })

    if (error) {
      notify({ message: 'Error accured while trying to log in' })
      tokenExpired()
      return false
    }

    notify({ success, message: 'Successfully Logged In !' })
    await sleep(1000)

    localStorage.setItem('accessToken', success.accessToken)
    localStorage.setItem('refreshToken', success.refreshToken)

    const _accessTokenData = jwt(success.accessToken) as TokenData
    initAuth(success.accessToken, _accessTokenData)

    navigate('/')
    return true
  }

  async function logout() {
    if (!accessToken || !accessTokenData) {
      alert('You are not logged in')
      return
    }

    const { success, error } = await logoutRequest({ userId: accessTokenData.userId, accessToken })

    if (error) {
      notify({ message: 'Error accured while trying to log out' })
    } else {
      notify({ success, message: 'Successfully logged out' })
    }

    await sleep(1000)

    tokenExpired()
  }

  function tokenExpired() {
    localStorage.clear()
    setAccessTokenData(null)
    setAccessToken(null)
    setProfile(null)

    navigate('/login')
  }

  function initAuth(accessToken: string, accessTokenData: TokenData) {
    setAccessToken(accessToken)
    setAccessTokenData(accessTokenData)

    const getProfile = async (accessToken: string) => {
      const { success, error } = await getProfileRequest({ accessToken })
      if (error) {
        if (error.status === 403) {
          tokenExpired()
          return
        }
        return
      }
      setProfile(success.data)
    }
    getProfile(accessToken)
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
  }

  return (
    <>
      <NotificationAlert ref={notificationAlertRef} />
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  )
}
