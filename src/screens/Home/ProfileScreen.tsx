import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'

import Header from '../../components/Header'
// UserPhoto es local, usar cualquier otra foto.
import UserPhoto from '../../assets/svg/User-yanapakun.svg'
import Camera from '../../assets/svg/Camara.svg'
import { SCREEN } from '../../utils/constants'
import { getProfile } from '../../services/yanapakun/profile'

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

interface Props {
  name: string
  age: number | string
  document: number
  district: string
  email: string
  phone: number
  phoneEmergency: number
  img: any
}

const ProfileScreen = ({ name, age, document, district, email, img, phone, phoneEmergency }: Props) => {
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
      const response = await getProfile()
      setProfile(response.data)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <SafeAreaView style={ styles.container }>
      <ScrollView>
        <View>
          <Header title="Perfil"/>
          <View>
            <View style={ styles.UserPhoto }>
              { /* <Image
                source={ img }
              /> */ }
              <UserPhoto />
              <TouchableOpacity
                style={ styles.saveUserPhoto }
                onPress={ () => alert('click') }
              >
                <Camera />
              </TouchableOpacity>
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
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF7'
  },
  UserPhoto: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 44
  },
  saveUserPhoto: {
    position: 'absolute',
    alignSelf: 'flex-end',
    left: (SCREEN.width * 2) / 3,
    top: 160
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
