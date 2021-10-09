import { createContext, useReducer } from 'react'
import authActions from './authActions'
import { authReducer } from './authReducer'

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

export const AuthContext = createContext<AuthContextProps | null>(null)

export const AuthProvider = ({ children }: any) => {
  /* const [authState, dispatch] = useReducer(authReducer, authInitialState)

  const login = async () => {
    dispatch({ type: 'signIn' })
  } */

  const { login, authState } = authActions()

  return (
    <AuthContext.Provider value={ {
      authState,
      signIn: () => { }
    } }>
      { children }
    </AuthContext.Provider>

  )
}
