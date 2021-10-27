import Api from './api'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const getProfile = async () => {
  return await Api.get('/users/profile/data')
}

export const updateProfile = async (userId: number, payload: any) => {
  return await Api.patch(`/users/profile/${userId}`, payload)
}

export const getProfilePhoto = async (id: number) => {
  const token = await AsyncStorage.getItem('token') ?? ''
  return await fetch(`https://yanapakunpolicia.com/users/profile/photo/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(async e => {
    const convertBlobToBase64 = async (blob: Blob) =>
      await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onerror = reject
        reader.onload = () => {
          resolve(reader.result)
        }
        reader.readAsDataURL(blob)
      })
    if (e.status === 200) {
      const resFile = await e.blob()
      return await convertBlobToBase64(resFile)
    }
  })
}

export const uploadImage = async (uri: string, id: number) => {
  const token = await AsyncStorage.getItem('token') ?? ''
  const uriArray = uri.split('.')
  const fileType = uriArray[uriArray.length - 1]
  const formData = new FormData()
  formData.append('photo', {
  // @ts-expect-error
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`
  })

  const options = {
    method: 'POST',
    body: formData,
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  }

  // @ts-expect-error
  return await fetch(`https://yanapakunpolicia.com/users/profile/photo/${id}`, options)
}
