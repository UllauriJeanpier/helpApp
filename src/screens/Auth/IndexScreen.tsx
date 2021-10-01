import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LogoPolicia from '../../assets/svg/LogoPolicia.svg'
import Alarma from '../../assets/svg/Alarma3.svg'
import Header from '../../components/Header'
import { RootStackParams } from '../../navigation/StackNavigator'
import { COLORS, FONTS } from '../../utils/constants'
import Button from '../../components/Button'

interface Props extends NativeStackScreenProps<RootStackParams, 'SignInScreen'> {}

const IndexScreen = ({ navigation }: Props) => {
  const goToSignIn = () => {
    navigation.navigate('SignInScreen')
  }

  const goToSignUp = () => {
    navigation.navigate('SignUpScreen')
  }

  return (
    <>
      <View style={ styles.container }>
        <Alarma width={ 150 } height={ 150 }/>
        <View style={ styles.btnContainer }>
          <Button title={ 'Iniciar sesión' } action={ goToSignIn }/>
          <Button title={ 'Regístrate' } action={ goToSignUp }/>
        </View>
      </View>
      <View style={ styles.footerContainer }>
        <LogoPolicia width={ '35%' } height={ '100%' } /* style={ styles.logo } *//>
        <View style={ styles.textContainer }>
          <Text style={ styles.textFooter }>
            Aplicativo respaldado por la Policia Nacional del Peru
          </Text>
          <Text style={ styles.textBoldFooter }>
            Comisaria de Huancavelica
          </Text>
        </View>
      </View>
    </>
  )
}

export default IndexScreen

const styles = StyleSheet.create({
  container: {
    flex: 5,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  btnContainer: {
    width: '100%',
    alignItems: 'center'
  },
  footerContainer: {
    flex: 1,
    paddingHorizontal: 25,
    flexDirection: 'row',
    paddingVertical: 15
    // backgroundColor: COLORS.PRIMARY,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  textFooter: {
    fontFamily: FONTS.ProximaNovaBold,
    color: COLORS.PRIMARY
  },
  textBoldFooter: {
    fontFamily: FONTS.ProximaNovaRegular,
    color: COLORS.PRIMARY
  }
})
