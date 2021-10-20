/* eslint-disable @typescript-eslint/consistent-type-assertions */

import React, { createContext, useEffect, useReducer } from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import { authReducer } from './authReducer'
import { IDataLogin, IResLogin } from '../../interfaces/authInterfaces'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { isPast, addMinutes } from 'date-fns'

export interface AuthState {
  isLoggdIn: boolean
  token?: string
  email?: string
  pushToken?: string
}

// initial State
export const authInitialState: AuthState = {
  isLoggdIn: false
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
        const config: AxiosRequestConfig = {
          method: 'get',
          url: 'https://yanapakunpolicia.com/auth/token',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        axios(config).then(async (response) => {
          const { data }: IResLogin = response.data
          if (response.status === 201) {
            const tokenExpiration = addMinutes(new Date(), 1)
            await AsyncStorage.setItem('token', data.access_token)
            await AsyncStorage.setItem('user', JSON.stringify(data.user))
            await AsyncStorage.setItem('isLoggdIn', String(true))
            await AsyncStorage.setItem('tokenExpiration', JSON.stringify(tokenExpiration))
            dispatch({ type: 'signIn', payload: data })
          }
        }).catch((err) => {
          console.log(err.message)
        })
        console.log('renew')
      }
    }
  }

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('token')
      await AsyncStorage.removeItem('user', () => {
      })
      await AsyncStorage.removeItem('isLoggdIn')

      await getAuthState()
    } catch (e) {
      // remove error
      console.log(e)
    }
  }

  const getAuthState = async () => {
    try {
      await checkIfTokenNeedsRefresh()
      const token = await AsyncStorage.getItem('token') ?? ''
      const isLoggdIn = await AsyncStorage.getItem('isLoggdIn') ?? ''
      const user = await AsyncStorage.getItem('user') ?? ''
      const data = {
        isLoggdIn: isLoggdIn ? JSON.parse(isLoggdIn) : false,
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
    const data = JSON.stringify({
      email: payload.email,
      password: payload.password
    })
    const config: AxiosRequestConfig = {
      method: 'post',
      url: 'https://yanapakunpolicia.com/auth/log-in',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }
    axios(config).then(async (response) => {
      const { data }: IResLogin = response.data
      if (response.status === 201) {
        const tokenExpiration = addMinutes(new Date(), 1)
        await AsyncStorage.setItem('token', data.access_token)
        await AsyncStorage.setItem('user', JSON.stringify(data.user))
        await AsyncStorage.setItem('isLoggdIn', JSON.stringify(true))
        await AsyncStorage.setItem('tokenExpiration', JSON.stringify(tokenExpiration))
        dispatch({ type: 'signIn', payload: data })
      }
    }).catch(error => {
      console.log(error.message)
    })
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

function totokenExpirationken (totokenExpirationken: any): string {
  throw new Error('Function not implemented.')
}
