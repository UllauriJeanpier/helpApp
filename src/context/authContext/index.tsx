/* eslint-disable @typescript-eslint/consistent-type-assertions */

import React, { createContext, useReducer } from 'react'
import axios, { AxiosRequestConfig } from 'axios'
/* import authActions from './authActions' */
import { authReducer } from './authReducer'
import { IResLogin } from '../../interfaces/authInterfaces'

// Prueba Axios

const data = JSON.stringify({
  email: '1999yaiper@gmail.com',
  password: 'test12345'
})

const config: AxiosRequestConfig = {
  method: 'post',
  url: 'https://yanapakunpolicia.com/auth/login',
  headers: {
    'Content-Type': 'application/json'
  },
  data: data
}

//* ****************************** */

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
  signIn: () => void
}

// create context

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: any) => {
  const [authState, dispatch] = useReducer(authReducer, authInitialState)

  const signIn = async () => {
    axios(config)
      .then((response) => {
        /* console.log(JSON.stringify(response.data)) */
        const { data, message }: IResLogin = response.data
        if (message !== 'Unauthorized') {
          // Funcion dispatch
          dispatch({ type: 'signIn', payload: data })
        }
      })
      .catch(function (error) {
        console.log(error)
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
