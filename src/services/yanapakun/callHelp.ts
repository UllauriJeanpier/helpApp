import Api from './api'

export const saveCallHelp = async () => {
  return await Api.post('/call-help')
}
