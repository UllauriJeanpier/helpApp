import Api from './api'

export const getProfile = async () => {
  return await Api.get('/users/profile/data')
}
