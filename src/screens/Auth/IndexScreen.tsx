import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LogoPolicia from '../../assets/svg/LogoPolicia.svg'
import Alarma from '../../assets/svg/LogoAlarma.svg'
import { RootStackParams } from '../../navigation/StackNavigator'
import { COLORS, FONTS } from '../../utils/constants'
import Button from '../../components/Button'
import CustomSwitch from '../../components/CustomSwitch'

interface Props extends NativeStackScreenProps<RootStackParams, 'SignInScreen'> {
}

const IndexScreen = ({ navigation }: Props) => {
  const goToSignIn = () => {
    navigation.replace('SignInScreen')
  }

  const goToSignUp = () => {
    navigation.replace('SignUpScreen')
  }

  return (
    <>
      <View style={ styles.container }>
        <CustomSwitch
          option1={ 'Castellano' }
          option2={ 'Quechua' }
          onSelectSwitch={ (val) => {
            console.log(val)
          } }
        />
        <Alarma width={ 150 } height={ 150 }/>
        <View style={ styles.btnContainer }>
          <Button title={ 'Iniciar sesión' } action={ goToSignIn } customStyles={ styles.btn }/>
          <Button title={ 'Regístrate' } action={ goToSignUp }/>
        </View>
      </View>
      <View style={ styles.footerContainer }>
        <LogoPolicia width={ '35%' } height={ '100%' } /* style={ styles.logo } *//>
        <View style={ styles.textContainer }>
          <Text style={ styles.textFooter }>
            Aplicativo pensado en la seguridad de los ciudadanos por una ciudad más segura
          </Text>
        </View>
      </View>
    </>
  )
}

export default IndexScreen

const styles = StyleSheet.create({
  btn: {
    marginVertical: -7
  },
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
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  textFooter: {
    fontFamily: FONTS.ProximaNovaBold,
    color: COLORS.PRIMARY,
    fontSize: 14
  }
})
