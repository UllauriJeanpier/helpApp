import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Alarma from '../../assets/svg/Alarma5.svg'
import Info from '../../assets/svg/info.svg'
import Header from '../../components/Header'
import { COLORS, FONTS, SCREEN } from '../../utils/constants'

const HomeScreeen = () => {
  return (
    <>
      <Header title='Yanapakun Policía' />
      <View style={ styles.container }>
        <Text style={ styles.txtInfo }>
          Si necesitas ayuda de forma urgente,
          presiona el botón para que una
          autoridad se dirija a tu ubicación
        </Text>
        <View style={ styles.imageContainer }>
          <Alarma width={ '100%' } height={ SCREEN.height * 0.3 } />
        </View>
        <Text style={ styles.txtEmergency }>
          SOLO EN CASO DE EMERGENCIA
        </Text>
        <View style={ styles.alertContainer }>
          <Info width={ 20 } height={ 20 }/>
          <Text style={ styles.txtAlert }>
            Recuerda que para la efectividad
            del aplicativo es importante tener
            tu ubicación activada
          </Text>
        </View>
      </View>
    </>
  )
}

export default HomeScreeen

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
