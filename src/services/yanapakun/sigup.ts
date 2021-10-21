import Api from './api'

export const userSignUp = async (payload: any) => {
  return await Api.post('/auth/register', payload)
}
