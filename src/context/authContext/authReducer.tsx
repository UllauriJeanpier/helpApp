import { IDataLogin } from '../../interfaces/authInterfaces'
import { AuthState } from './authContext'

type AuthActions = {type: 'signIn', payload: IDataLogin}

export const authReducer = (state: AuthState, action: AuthActions): AuthState => {
  switch (action.type) {
    case 'signIn':
      return {
        ...state,
        isLoggdIn: true,
        token: action.payload.access_token,
        email: action.payload.user.email
      }
    default:
      return state
  }
}
