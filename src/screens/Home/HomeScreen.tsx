import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { DrawerScreenProps } from '@react-navigation/drawer';
import Alarma from '../../assets/svg/Alarma5.svg'
import Info from '../../assets/svg/info.svg'
import Header from '../../components/Header'
import ModalInfo from '../../components/ModalInfo'
import { IPosition } from '../../interfaces/locationInterface'
import { COLORS, FONTS, SCREEN } from '../../utils/constants'
import { getCurrentLocation } from '../../utils/helpers'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { updatePartialUser } from '../../services/yanapakun/user'
import { IUserLogin } from '../../interfaces/authInterfaces'
import { updateProfile } from '../../services/yanapakun/profile'
import { RootDrawerParams } from '../../navigation/DrawerNavigator'

interface Props extends DrawerScreenProps<RootDrawerParams, 'HomeScreen'>{}

const HomeScreen = ({ navigation }: Props) => {
  const [modalVisible, setModalVisible] = useState(true)
  const [location, setLocation] = useState<IPosition>()
  const [disabled, setDisabled] = useState(false)

  const saveTokenNotification = async () => {
    try {
      const user = await AsyncStorage.getItem('user')
      const token = await AsyncStorage.getItem('tokenNotification') ?? ''
      let dataUser: IUserLogin
      if (typeof user === 'string') {
        dataUser = JSON.parse(user)
        if (token ?? user) {
          await updatePartialUser(dataUser?.id, {
            notificationToken: token
          })
        }
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  const getLocation = async () => {
    const {
      status,
      position
    } = await getCurrentLocation()
    if (!status) {
      // Mostrar nuevamente el modal
      setModalVisible(true)
      return
    }
    console.log(position, 'Position');
    position && setLocation(position as IPosition)
    console.log(location, 'location')
    // Guardar latitud y longitud
    try {
      const user = await AsyncStorage.getItem('user')
      let dataUser: IUserLogin
      if (typeof user === 'string') {
        dataUser = JSON.parse(user)
        await updateProfile(dataUser?.id, {
          latitude: String(position?.latitude),
          longitude: String(position?.longitude)
        })
      }
      setDisabled(true)
      navigation.navigate('AnimatedScreen')
    } catch (e) {
      console.log(e.message)
    }
  }

  const openMenu = () => {
    navigation.toggleDrawer()
  }
  const getDisabledBtnHelp = async () => {
    const disabledBtnHelp = await AsyncStorage.getItem('btnHelp')
    if(disabledBtnHelp !== null) {
      console.log(disabledBtnHelp, 'Deshabilitado');
      setDisabled(true)
    }
  }

  useEffect(() => {
    getDisabledBtnHelp()
    saveTokenNotification().then(() => console.log('save token notification'))
  }, [])

  return (
    <>
      <Header title="Yanapakun Policía" icon={ 'menu' } action={ openMenu }/>
      <View style={ styles.container }>
        <Text style={ styles.txtInfo }>
          Si necesitas ayuda de forma urgente,
          presiona el botón para que una
          autoridad se dirija a tu ubicación
        </Text>
        <TouchableOpacity disabled={ disabled } style={ styles.imageContainer } onPress={ getLocation }>
          <Alarma width={ '100%' } height={ SCREEN.height * 0.3 }/>
        </TouchableOpacity>
        {
          disabled ? (
            <Text style={ styles.txtEmergency }>YA ENVIASTE UNA SOLICITUD DE EMERGENCIA</Text>            
          ) : (
            <Text style={ styles.txtEmergency }>SOLO EN CASO DE EMERGENCIA</Text>
          )
        }
        <View style={ styles.alertContainer }>
          <Info width={ 20 } height={ 20 }/>
          <Text style={ styles.txtAlert }>
            Recuerda que para la efectividad
            del aplicativo es importante tener
            tu ubicación activada
          </Text>
        </View>
        <ModalInfo
          isVisible={ modalVisible }
          hideAction={ () => setModalVisible(false) }
        />
      </View>
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    backgroundColor: 'white'
    // backgroundColor: 'red'
  },
  txtInfo: {
    paddingHorizontal: 20,
    textAlign: 'center',
    fontFamily: FONTS.ProximaNovaBold,
    color: COLORS.TEXT_COLOR,
    fontSize: 15
    // backgroundColor: 'red'
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center'
    //  backgroundColor: 'red'
  },
  txtEmergency: {
    textAlign: 'center',
    fontSize: SCREEN.width * 0.05,
    fontFamily: FONTS.ProximaNovaExtrabold,
    color: COLORS.TEXT_EMERGENCY
  },
  alertContainer: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4EEE3',
    borderRadius: 15
  },
  txtAlert: {
    flex: 1,
    marginLeft: 10,
    fontSize: 12,
    fontFamily: FONTS.ProximaNovaRegular
    // textAlign: 'center'
  }
})
