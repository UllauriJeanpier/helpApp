import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LogoPolicia from '../../assets/svg/LogoPolicia.svg'
import Alarma from '../../assets/svg/Alerta.svg'
import Header from '../../components/Header'
import { RootStackParams } from '../../navigation/StackNavigator'
import { COLORS } from '../../utils/constants'
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
      <Header title="Ayuda app"/>
      <View style={ styles.container }>
        <Alarma width={ 120 } height={ 120 }/>
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
        </View>
      </View>
    </>
  )
}

export default IndexScreen

const styles = StyleSheet.create({
  container: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  btnContainer: {
    width: '80%',
    alignItems: 'center'
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 15
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  textFooter: {
    color: 'white'
  }
})
