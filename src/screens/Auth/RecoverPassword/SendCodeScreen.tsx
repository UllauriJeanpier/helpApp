import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import Button from '../../../components/Button'
import Header from '../../../components/Header'
import Loading from '../../../components/Loading'
import { RootStackParams } from '../../../navigation/StackNavigator'
import { sendCode } from '../../../services/yanapakun/user'
import { COLORS, FONTS } from '../../../utils/constants'
import { RESPONSE_MSG } from '../../../utils/responses'

interface Props extends NativeStackScreenProps<RootStackParams, 'SendCodeScreen'> {
}

const SendCodeScreen = ({ navigation, route }: Props) => {
  const [loading, setLoading] = useState(false)

  // Numbers
  const [num1, setNum1] = useState<string>()
  const [num2, setNum2] = useState<string>()
  const [num3, setNum3] = useState<string>()
  const [num4, setNum4] = useState<string>()

  const goToSignIn = () => navigation.replace('SignInScreen')

  const onSend = async () => {
    const { email } = route.params
    if (!num1 || !num2 || !num3 || !num4) {
      Alert.alert('Ingrese el codigo completo')
      return
    }
    try {
      setLoading(true)
      const code = `${num1}${num2}${num3}${num4}`
      /* const response = await sendCode({ email, code })
      if (response.message === RESPONSE_MSG.INCORRECTCODE) {
        Alert.alert('El codigo es incorrecto')
      }
      if (response.message === RESPONSE_MSG.CORRECTCODE) {
        navigation.navigate('ChangePasswordScreen', { email })
      } */
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  return (
    <Loading loading={ loading }>
      <ScrollView>
        <Header title="Recuperar Contraseña" icon="keyboard-arrow-left" action={ goToSignIn }/>
        <View style={ styles.container }>
          <View style={ styles.inputsContainer }>
            <Text style={ styles.txtSubtitle }>Ingresa el código de verificación que fue enviado a tu correo electrónico</Text>
            <View style={ styles.CodeContainer }>
              <TextInput
                /* ref="FirstInput" */
                value={ num1 }
                keyboardType= 'numeric'
                style={ styles.TxtInput }
                placeholder="X"
                maxLength={ 1 }
                textContentType="creditCardNumber"
                autoFocus={ true }
                /* onKeyPress={() => this._focusNextField('SecondInput')} */
                onChangeText={ text => setNum1(text) }
              />
              <TextInput
                /* ref="FirstInput" */
                value={ num2 }
                keyboardType= 'numeric'
                style={ styles.TxtInput }
                placeholder="X"
                maxLength={ 1 }
                textContentType="creditCardNumber"
                autoFocus={ true }
                /* onKeyPress={() => this._focusNextField('SecondInput')} */
                onChangeText={ text => setNum2(text) }
              />
              <TextInput
                /* ref="FirstInput" */
                value={ num3 }
                keyboardType= 'numeric'
                style={ styles.TxtInput }
                placeholder="X"
                maxLength={ 1 }
                textContentType="creditCardNumber"
                autoFocus={ true }
                /* onKeyPress={() => this._focusNextField('SecondInput')} */
                onChangeText={ text => setNum3(text) }
              />
              <TextInput
                /* ref="FirstInput" */
                value={ num4 }
                keyboardType= 'numeric'
                style={ styles.TxtInput }
                placeholder="X"
                maxLength={ 1 }
                textContentType="creditCardNumber"
                autoFocus={ true }
                /* onKeyPress={() => this._focusNextField('SecondInput')} */
                onChangeText={ text => setNum4(text) }
              />
            </View>
          </View>
          <View style={ styles.sessionContainer }>
            <Button title={ 'Enviar' } action={ onSend }/>
          </View>
        </View>
      </ScrollView>
    </Loading>
  )
}

export default SendCodeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 100,
    justifyContent: 'space-evenly'
  },
  inputsContainer: {
    justifyContent: 'center'
  },
  txtSubtitle: {
    fontFamily: FONTS.ProximaNovaBold,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30
  },
  sessionContainer: {
    height: '50%'
  },
  CodeContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 200,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  TxtInput: {
    width: '21%',
    textAlign: 'center',
    fontSize: 45,
    height: 80,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    borderStyle: 'solid',
    fontFamily: FONTS.ProximaNovaBold
  }
})
