import Api from './api'

export const updatePartialUser = async (id: number, payload: any) => {
  return await Api.patch(`/users/${id}`, payload)
}
