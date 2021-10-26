export interface IResLogin {
  message: string
  data: IDataLogin
}

export interface IDataLogin {
  user: IUserLogin
  access_token: string
  isLogIn: boolean
}

export interface IUserLogin {
  id: number
  email: string
  roles: string[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
