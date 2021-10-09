import React, { useReducer } from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import { authReducer } from './authReducer'
import { authInitialState } from './authContext'
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

const authActions = () => {
  const [authState, dispatch] = useReducer(authReducer, authInitialState)

  const login = async () => {
    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data))
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

  return {
    authState, login
  }
}

export default authActions
