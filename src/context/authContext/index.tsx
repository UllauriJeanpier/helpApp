/* eslint-disable @typescript-eslint/consistent-type-assertions */

import React, { createContext, useEffect, useReducer } from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import { authReducer } from './authReducer'
import { IDataLogin, IResLogin } from '../../interfaces/authInterfaces'
import AsyncStorage from '@react-native-async-storage/async-storage'

axios.defaults.baseURL = 'https://yanapakunpolicia.com'

const configureAxiosHeaders = (token: string) => {
  axios.defaults.headers.Authorization = `Bearer ${token}`
}

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
}

// create context
export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: any) => {
  const [authState, dispatch] = useReducer(authReducer, authInitialState)

  const getAuthState = async (payload: IDataLogin) => {
    try {
      const authDataString = await AsyncStorage.getItem('token')
      const authData = JSON.parse(authDataString ?? '')
      configureAxiosHeaders(authData)
      dispatch({ type: 'signIn', payload: payload })
    } catch (err) {
      Promise.reject(err)
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
        await AsyncStorage.setItem('token', JSON.stringify(data.access_token))
        configureAxiosHeaders(data.access_token)
        dispatch({ type: 'signIn', payload: data })
      }
    }).catch(error => {
      console.log(error.message)
    })
  }

  return (
    <AuthContext.Provider value={ {
      authState,
      signIn
    } }>
      { children }
    </AuthContext.Provider>

  )
}
