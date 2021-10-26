import Api from './api'

export const getProfile = async () => {
  return await Api.get('/users/profile/data')
}

export const getProfilePhoto = async ( id: number ) => {
  return await Api.get(`/users/profile/photo/${id}`)
}

// export const uploadImage = async (photo: string, id: number,)=> {

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
