import React, { useEffect, useState } from 'react'
import { Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Header from '../../components/Header'
import UserPhoto from '../../assets/svg/User-yanapakun.svg'
import Camera from '../../assets/svg/Camara.svg'
import { getProfile, getProfilePhoto, uploadImage } from '../../services/yanapakun/profile'
import Loading from '../../components/Loading'

import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IUserLogin } from '../../interfaces/authInterfaces'

interface UserData {
  email: string
}

interface ProfileData {
  age: number
  dateBirth: string
  district: string
  document: string
  emergencyNumber: string
  firstName: string
  gender: string
  id: number
  lastName: string
  latitude: string
  longitude: string
  phone: string
  updatedAt: string
  user: UserData
}

const ProfileScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<ProfileData>({
    age: 0,
    dateBirth: '',
    district: '',
    document: '',
    emergencyNumber: '',
    firstName: '',
    gender: '',
    id: 0,
    lastName: '',
    latitude: '',
    longitude: '',
    phone: '',
    updatedAt: '',
    user: {
      email: ''
    }
  })
  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await getProfile()
      setProfile(response.data)
      await fetchPhotoUser()
    } catch (e) {
      console.log(e)
    }
  }
  const [image, setImage] = useState<string>('')

  const fetchPhotoUser = async () => {
    try {
      setLoading(true)
      const user = await AsyncStorage.getItem('user')
      let dataUser: IUserLogin
      if (typeof user === 'string') {
        dataUser = JSON.parse(user)
        const response = await getProfilePhoto(dataUser?.id)
        if (response) {
          setImage(String(response))
        } else {
          setImage('')
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  const pickImg = async () => {
    if (Platform.OS === 'ios') {
      const cameraRollStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync()
      if (
        cameraRollStatus.status !== 'granted' ||
        cameraStatus.status !== 'granted'
      ) {
        alert('Lo sentimos, necesitamos estos permisos para que esto funcione.')
      }
    }
  }

  useEffect(() => {
    fetchData().then(() => {
      setLoading(false)
    })
    pickImg()
  }, [])

  const pickerPicture = async () => {
    try {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [2, 2]
      })
      console.log(pickerResult)
      await handleImagePicked(pickerResult)
    } catch (e) {
      console.log(e)
    }
  }

  const handleImagePicked = async (pickerResult: ImagePicker.ImagePickerResult) => {
    try {
      if (!pickerResult.cancelled) {
        await uploadImage(pickerResult.uri, 1)
        await fetchData()
        setLoading(false)
      }
    } catch (e) {
      console.log({ e })
      alert('Upload failed, sorry :(')
    }
  }

  return (
    <Loading loading={ loading }>
      <SafeAreaView style={ styles.container }>
        <ScrollView>
          <View>
            <Header title="Perfil" icon={ 'menu' } action={ () => navigation.toggleDrawer() }/>
            <View>
              <View style={ styles.containPhotoUser }>
                <View style={ styles.UserPhoto }>
                  {
                    (image)
                      ? (
                        <Image
                          source={ { uri: image } }
                          style={ styles.usePickerPhoto }
                        />
                        )
                      : (
                        <UserPhoto/>
                        ) }
                  <TouchableOpacity
                    style={ styles.saveUserPhoto }
                    onPress={ pickerPicture }
                  >
                    <Camera/>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={ styles.data }>
                <View style={ styles.dataUser }>
                  <Text style={ styles.fontText }>Nombre:</Text>
                  <Text style={ styles.fontText }>{ profile.firstName } { profile.lastName }</Text>
                </View>
                <View style={ styles.dataUser }>
                  <Text style={ styles.fontText }>Edad:</Text>
                  <Text style={ styles.fontText }>{ profile.age } años</Text>
                </View>
                <View style={ styles.dataUser }>
                  <Text style={ styles.fontText }>DNI:</Text>
                  <Text style={ styles.fontText }>{ profile.document }</Text>
                </View>
                <View style={ styles.dataUser }>
                  <Text style={ styles.fontText }>Distrito:</Text>
                  <Text style={ styles.fontText }>{ profile.district }</Text>
                </View>
                <View style={ styles.dataUser }>
                  <Text style={ styles.fontText }>E-mail:</Text>
                  <Text style={ styles.fontText }>{ profile.user.email }</Text>
                </View>
                <View style={ styles.dataUser }>
                  <Text style={ styles.fontText }>Número de teléfono:</Text>
                  <Text style={ styles.fontText }>{ profile.phone }</Text>
                </View>
                <View style={ styles.lastDataUser }>
                  <Text style={ styles.fontText }>Teléfono de emergencia:</Text>
                  <Text style={ styles.fontText }>{ profile.emergencyNumber }</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Loading>

  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF7'
  },
  containPhotoUser: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  UserPhoto: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 44,
    height: 200,
    width: 180,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderColor: '#e3e3e3',
    borderWidth: 1
  },
  saveUserPhoto: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: -10,
    bottom: -10
  },
  usePickerPhoto: {
    width: 180,
    height: 200,
    borderRadius: 20
  },
  data: {
    paddingHorizontal: 28
  },
  dataUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#216D3F',
    borderBottomWidth: 1,
    paddingVertical: 18
  },
  lastDataUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18
  },
  fontText: {
    color: '#3A413D',
    fontSize: 16,
    fontWeight: 'bold'
  }
})
