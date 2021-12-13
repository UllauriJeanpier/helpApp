import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import Button from '../../../components/Button'
import Header from '../../../components/Header'
import InputForm from '../../../components/InputForm'
import Loading from '../../../components/Loading'
import { RootStackParams } from '../../../navigation/StackNavigator'
import { sendMail } from '../../../services/yanapakun/user'
import { FONTS } from '../../../utils/constants'
import { RESPONSE_MSG } from '../../../utils/responses'
import { handleEmail } from '../../../utils/validateFuntions'

interface Props extends NativeStackScreenProps<RootStackParams, 'SendEmailScreen'> {
}

const SendEmailScreen = ({ navigation }: Props) => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [validateEmail, setValidateEmail] = useState(false)

  const goToSignIn = () => navigation.replace('SignInScreen')

  const onSend = async () => {
    if (email.length === 0) {
      Alert.alert('Complete el campo para continuar')
      return
    }
    try {
      setLoading(true)
      const response = await sendMail({ email })
      console.log(response)
      if (response.status) {
        navigation.navigate('SendCodeScreen', { email })
      } else {
        Alert.alert('No existe este email registrado')
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <Loading loading={ loading }>
      <ScrollView>
        <Header title="Recuperar Contraseña" icon="keyboard-arrow-left" action={ goToSignIn }/>
        <View style={ styles.container }>
          <View style={ styles.inputsContainer }>
            <Text style={ styles.txtSubtitle }>Al ingresar tu correo electrónico se te enviará las indicaciones para recuperar tu contraseña</Text>
            <InputForm
              label={ 'Correo electrónico:' }
              placeholder={ 'Escriba su correo electrónico' }
              valueInput={ email }
              setValueInput={ setEmail }
              validateInput={ validateEmail }
              setValidateInput={ setValidateEmail }
              functionValidation={ handleEmail }
              errorMessage={ 'Escribe un correo válido' }
          />
          </View>
          <View style={ styles.sessionContainer }>
            <Button title={ 'Enviar' } action={ onSend }/>
          </View>
        </View>
      </ScrollView>
    </Loading>
  )
}

export default SendEmailScreen

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
  }
})
