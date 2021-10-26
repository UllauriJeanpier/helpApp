import Api from './api'

export const getProfile = async () => {
  return await Api.get('/users/profile/data')
}

export const updateProfile = async (userId: number, payload: any) => {
  return await Api.patch(`/users/profile/${userId}`, payload)
}
