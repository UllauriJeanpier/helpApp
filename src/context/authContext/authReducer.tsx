import React from 'react'
import { IDataLogin } from '../../interfaces/authInterfaces'
import { AuthState } from '.'

type AuthActions = {type: 'signIn', payload: IDataLogin}

export const authReducer = (state: AuthState, action: AuthActions): AuthState => {
  switch (action.type) {
    case 'signIn':
      return {
        isLogIn: action.payload.isLogIn,
        token: action.payload.access_token,
        email: action.payload.user.email
      }
    default:
      return state
  }
}
