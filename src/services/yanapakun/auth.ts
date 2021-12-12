import Api, { baseURL } from './api'

export const userLogin = async (payload: any) => {
  /* return await Api.post('/auth/log-in', payload) */
  return await fetch(`${baseURL}/auth/log-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then(async response => await response.json())
}

export const refreshToken = async () => {
  return await Api.get('/auth/token')
}
