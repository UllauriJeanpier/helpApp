import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const baseURL = 'https://yanapakunpolicia.com'

const api = axios.create({
  baseURL
})
api.interceptors.request.use(
  async (config) => {
    const urlsExcludedForBearerHeader = [
      '/auth/log-in',
      '/auth/register/user'
    ]
    if (!urlsExcludedForBearerHeader.includes(config.url ?? '')) {
      const token = await AsyncStorage.getItem('token') ?? ''
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  async (error) => {
    const code = parseInt(error.response?.status)
    if (code === 401) {
      console.log('Not authorized')
    }
    return await Promise.reject(error)
  }
)

api.interceptors.response.use((config) => {
  return config
}, async (error) => {
  console.log(error.response?.data)
  const code = parseInt(error.response?.status)
  if (code === 401) {
    console.log('Not authorized')
  }
  return await Promise.reject(error)
})

export const fetcher = async (resource: string) => {
  try {
    const response = await api.get(resource)
    return response?.data
  } catch (error) {
    throw new Error(error)
  }
}

export default api
