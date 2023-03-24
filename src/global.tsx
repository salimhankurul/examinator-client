import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt from 'jwt-decode' // import dependency
import NotificationAlert from 'react-notification-alert'

import { loginRequest, logoutRequest, getProfileRequest } from './api/api'
import { TokenMetaData, UsersTableItem, PrivateContext } from './back-types'

const AuthContext = React.createContext<PrivateContext>({} as PrivateContext)

export function useAuth(): PrivateContext {
  return useContext(AuthContext)
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function AuthProvider({ children }: any) {
  const [accessToken, setAccessToken] = useState<string | null>()
  const [accessTokenData, setAccessTokenData] = useState<TokenMetaData | null>()
  const [user, setUser] = useState<UsersTableItem | null>()

  const navigate = useNavigate()
  const notificationAlertRef = React.useRef<any>(null)

  const notify = ({ success, message }: { success?: boolean; message: string }) => {
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

  async function login(email: string, password: string): Promise<boolean> {
    if (accessToken) {
      alert('You are already logged in')
      return false
    }

    const res = await loginRequest({ email, password })

    if (res.success == false) {
      notify({ success: false, message: 'Error accured while trying to log in' })
      terminateSession()
      return false
    }

    notify({ success: true, message: 'Successfully Logged In !' })
    
    await sleep(1000)

    localStorage.setItem('accessToken', res.data.session.accessToken)
    localStorage.setItem('refreshToken', res.data.session.refreshToken)

    const _accessTokenData = jwt(res.data.session.accessToken) as TokenMetaData
    setAccessToken(res.data.session.accessToken)
    setAccessTokenData(_accessTokenData)
    setUser(res.data.user)

    navigate('/')
    return true
  }

  async function logout(): Promise<void> {
    if (!accessToken || !accessTokenData) {
      notify({ success: false, message: 'Error accured while trying to log out' })
      return
    }

    const res = await logoutRequest({ userId: accessTokenData.userId, accessToken })
    
    if (res.success == false) {
      notify({ success: false, message: 'Error accured while trying to log out' })
      terminateSession()
      return
    }

    notify({ success: true, message: 'Successfully loged out' })

    await sleep(1000)

    terminateSession()
  }

  async function fetchUser(accessToken: string): Promise<void> {
    const res = await getProfileRequest({ accessToken })
    
    if (res.success == false) {
      notify({ success: false, message: 'Error accured while trying to get user' })
      terminateSession()
      return
    }

    notify({ success: true, message: 'Successfully fetched user' })
    setUser(res.data.user)
  }

  async function terminateSession(): Promise<void> {
    localStorage.clear()
    setAccessTokenData(null)
    setAccessToken(null)
    setUser(null)

    navigate('/login')
  }

  // this is called when page is refreshed, and we need to reinitialize the private route
  function privateRouteRefreshInit(accessToken: string, accessTokenData: TokenMetaData): void {
    setAccessToken(accessToken)
    setAccessTokenData(accessTokenData)
    fetchUser(accessToken)
  }

  const value = {
    accessToken,
    accessTokenData,
    user,

    login,
    logout,
    terminateSession,
    privateRouteRefreshInit,

    setAccessToken,
    setAccessTokenData,
    setUser,
  } as PrivateContext

  return (
    <>
      <NotificationAlert ref={notificationAlertRef} />
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  )
}
