import io from 'socket.io-client'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const ws = async () => {
  const token = await AsyncStorage.getItem('token') ?? ''
  return io('https://yanapakunpolicia.com', {
    extraHeaders: {
      Authorization: `Bearer ${token}`
    },
    transports: ['websocket']
  })
}
