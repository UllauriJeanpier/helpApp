import Api from './api'

export const userLogin = async (payload: any) => {
  return await Api.post('/auth/log-in', payload)
}

export const refreshToken = async () => {
  return await Api.get('/auth/token')
}
