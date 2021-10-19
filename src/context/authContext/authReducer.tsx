import React from 'react'
import { IDataLogin } from '../../interfaces/authInterfaces'
import { AuthState } from '.'

type AuthActions = {type: 'signIn', payload: IDataLogin}

export const authReducer = (state: AuthState, action: AuthActions): AuthState => {
  switch (action.type) {
    case 'signIn':
      return {
        isLoggdIn: action.payload.isLoggdIn,
        token: action.payload.access_token,
        email: action.payload.user.email,
        pushToken: ''
      }
    default:
      return state
  }
}
