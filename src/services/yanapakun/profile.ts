import Api from './api'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const getProfile = async () => {
  return await Api.get('/users/profile/data')
}

export const getProfilePhoto = async (id: number) => {
  const token = await AsyncStorage.getItem('token') ?? ''
  const file = await fetch(`https://yanapakunpolicia.com/users/profile/photo/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const dataBlob = await file.blob()

  const convertBlobToBase64 = async (blob: Blob) =>
    await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onerror = reject
      reader.onload = () => {
        resolve(reader.result)
      }
      reader.readAsDataURL(blob)
    })

  return await convertBlobToBase64(dataBlob)
}

// export const uploadImage = a sync (photo: string, id: number,)=> {

//   // const formData = new FormData()
//   // formData.append('photo',photo)

//   // const body = {
//   //   photo,
//   //   "Content-Type": "multipart/form-data"
//   // }

//   // try {
//   //   const resp = await Api.post(`/users/profile/photo/${id}`, body)
//   //   console.log({resp});

//   // } catch (error) {
//   //   console.log({error});

//   // }
// }
