/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { createContext, useEffect, useReducer } from 'react'
import { authReducer } from './authReducer'
import { IDataLogin, IResLogin } from '../../interfaces/authInterfaces'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { isPast, addMinutes } from 'date-fns'
import { refreshToken, userLogin } from '../../services/yanapakun/auth'

export interface AuthState {
  isLogIn: boolean
  token?: string
  email?: string
  pushToken?: string
}

// initial State
export const authInitialState: AuthState = {
  isLogIn: false
}

export interface AuthContextProps {
  authState: AuthState
  signIn: (payload: any) => void
  getAuthState: () => void
  logOut: () => void
}

// create context
export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: any) => {
  const [authState, dispatch] = useReducer(authReducer, authInitialState)

  const checkIfTokenNeedsRefresh = async () => {
    const token = await AsyncStorage.getItem('token') ?? ''
    let tokenExpiration: string = await AsyncStorage.getItem('tokenExpiration') ?? ''
    tokenExpiration = JSON.parse(tokenExpiration)

    if (token !== null && tokenExpiration !== null) {
      if (isPast(new Date(tokenExpiration))) {
        refreshToken().then(async (response) => {
          if (response.status === 201) {
            const { data }: IResLogin = response.data
            const tokenExpiration = addMinutes(new Date(), 1)
            await AsyncStorage.setItem('token', data.access_token)
            await AsyncStorage.setItem('user', JSON.stringify(data.user))
            await AsyncStorage.setItem('isLogIn', String(true))
            await AsyncStorage.setItem('tokenExpiration', JSON.stringify(tokenExpiration))
            dispatch({ type: 'signIn', payload: data })
          }
        }).catch((err) => {
          logOut()
          console.log(err.message)
        })
      }
    }
  }

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('token')
      await AsyncStorage.removeItem('user')
      await AsyncStorage.removeItem('isLogIn')
      await AsyncStorage.removeItem('language')
      await AsyncStorage.removeItem('btnHelp')
      await getAuthState()
    } catch (e) {
      console.log(e)
    }
  }

  const getAuthState = async () => {
    try {
      await checkIfTokenNeedsRefresh()
      const token = await AsyncStorage.getItem('token') ?? ''
      const isLogIn = await AsyncStorage.getItem('isLogIn') ?? ''
      const user = await AsyncStorage.getItem('user') ?? ''
      const data = {
        isLogIn: isLogIn ? JSON.parse(isLogIn) : false,
        access_token: token,
        user: user ? JSON.parse(user) : {}
      }
      dispatch({
        type: 'signIn',
        payload: data
      })
    } catch (err) {
      console.log(err)
    }
  }

  const signIn = async (payload: any) => {
    try {
      const response = await userLogin(payload)
      const { data }: IResLogin = response.data
      if (response.status === 201) {
        const tokenExpiration = addMinutes(new Date(), 1440)
        await AsyncStorage.setItem('token', data.access_token)
        await AsyncStorage.setItem('user', JSON.stringify(data.user))
        await AsyncStorage.setItem('isLogIn', JSON.stringify(true))
        await AsyncStorage.setItem('tokenExpiration', JSON.stringify(tokenExpiration))
        dispatch({ type: 'signIn', payload: data })
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getAuthState().then(r => console.log('SESSION VALIDATE'))
  }, [])

  return (
    <AuthContext.Provider value={ {
      authState,
      signIn,
      getAuthState,
      logOut
    } }>
      { children }
    </AuthContext.Provider>

  )
}
