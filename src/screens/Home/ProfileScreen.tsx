import React, { useEffect, useState } from 'react'
import { Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import Header from '../../components/Header'
import UserPhoto from '../../assets/svg/User-yanapakun.svg'
import Camera from '../../assets/svg/Camara.svg'
import { getProfile, getProfilePhoto, updateProfile, uploadImage } from '../../services/yanapakun/profile'
import Loading from '../../components/Loading'

import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IUserLogin } from '../../interfaces/authInterfaces'
import { IProfile } from '../../interfaces/profileInterfaces'
import Button from '../../components/Button'
import { updatePartialUser } from '../../services/yanapakun/user'

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
  const [profile, setProfile] = useState<IProfile>()

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await getProfile()
      if (response) {
        setProfile(response.data)
        await fetchPhotoUser()
      }
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
      await handleImagePicked(pickerResult)
    } catch (e) {
      console.log(e)
    }
  }

  const handleImagePicked = async (pickerResult: ImagePicker.ImagePickerResult) => {
    try {
      if (!pickerResult.cancelled) {
        const user = await AsyncStorage.getItem('user')
        let dataUser: IUserLogin
        if (typeof user === 'string') {
          dataUser = JSON.parse(user)
          await uploadImage(pickerResult.uri, dataUser.id)
          await fetchData()
          setLoading(false)
        }
      }
    } catch (e) {
      console.log({ e })
      alert('Upload failed, sorry :(')
    }
  }

  const onSave = async () => {
    if (profile) {
      // save profile
      const profileDataPayload = {
        firstName: profile?.firstName,
        lastName: profile?.lastName,
        age: profile?.age,
        document: profile?.document,
        district: profile?.district,
        phone: profile?.phone,
        emergencyNumber: profile.emergencyNumber
      }
      await updateProfile(profile.id, JSON.stringify(profileDataPayload))
      // save userEmail
      const userDataPayload = {
        email: profile.user.email
      }
      await updatePartialUser(profile.user.id, JSON.stringify(userDataPayload))
    }
    navigation.navigate('HomeScreen')
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
              { profile && (
              <>
                <View style={ styles.data }>
                  <View style={ styles.dataUser }>
                    <Text style={ styles.fontText }>Nombres:</Text>
                    <TextInput
                      value={ profile.firstName }
                      maxLength={ 30 }
                      style={ styles.fontText }
                      onChangeText={ e => setProfile({ ...profile, firstName: e }) }
                  />
                  </View>
                  <View style={ styles.dataUser }>
                    <Text style={ styles.fontText }>Apellidos:</Text>
                    <TextInput
                      value={ profile.lastName }
                      maxLength={ 30 }
                      style={ styles.fontText }
                      onChangeText={ e => setProfile({ ...profile, lastName: e }) }
                  />

                  </View>
                  <View style={ styles.dataUser }>
                    <Text style={ styles.fontText }>Edad:</Text>
                    <TextInput
                      value={ profile.age.toString() }
                      keyboardType= 'numeric'
                      maxLength={ 2 }
                      style={ styles.fontText }
                      onChangeText={ e => setProfile({ ...profile, age: Number(e) }) }
                  />
                  </View>
                  <View style={ styles.dataUser }>
                    <Text style={ styles.fontText }>DNI:</Text>
                    <TextInput
                      value={ profile.document }
                      keyboardType= 'numeric'
                      maxLength={ 8 }
                      style={ styles.fontText }
                      onChangeText={ e => setProfile({ ...profile, document: e }) }
                  />
                  </View>
                  <View style={ styles.dataUser }>
                    <Text style={ styles.fontText }>Distrito:</Text>
                    <TextInput
                      value={ profile.district }
                      style={ styles.fontText }
                      maxLength={ 40 }
                      onChangeText={ e => setProfile({ ...profile, district: e }) }
                  />
                  </View>
                  <View style={ styles.dataUser }>
                    <Text style={ styles.fontText }>E-mail:</Text>
                    <TextInput
                      value={ profile.user.email }
                      style={ styles.fontText }
                      maxLength={ 40 }
                      onChangeText={ e => setProfile({ ...profile, user: { ...profile.user, email: e } }) }
                  />
                  </View>
                  <View style={ styles.dataUser }>
                    <Text style={ styles.fontText }>Número de teléfono:</Text>
                    <TextInput
                      keyboardType= 'numeric'
                      value={ profile.phone }
                      style={ styles.fontText }
                      maxLength={ 11 }
                      onChangeText={ e => setProfile({ ...profile, phone: e }) }
                  />
                  </View>
                  <View style={ styles.dataUser }>
                    <Text style={ styles.fontText }>Teléfono de emergencia:</Text>
                    <TextInput
                      keyboardType= 'numeric'
                      value={ profile.emergencyNumber }
                      style={ styles.fontText }
                      maxLength={ 11 }
                      onChangeText={ e => setProfile({ ...profile, emergencyNumber: e }) }
                  />
                  </View>
                </View>
                <View style={ styles.btnContainer } >
                  <Button title='Guardar' action={ onSave } />
                </View>
              </>
              ) }
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
  },
  btnContainer: {
    paddingHorizontal: 25,
    marginBottom: 10
  }
})
