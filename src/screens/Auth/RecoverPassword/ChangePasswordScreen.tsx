import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Button from '../../../components/Button'
import Header from '../../../components/Header'
import InputForm from '../../../components/InputForm'
import Loading from '../../../components/Loading'
import { RootStackParams } from '../../../navigation/StackNavigator'
import { FONTS } from '../../../utils/constants'
import { handlePassword } from '../../../utils/validateFuntions'

interface Props extends NativeStackScreenProps<RootStackParams, 'ChangePasswordScreen'> { }

const ChangePasswordScreen = ({ navigation, route }: Props) => {
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [validatePassword, setValidatePassword] = useState(false)

  const [confirmPassword, setConfirmPassword] = useState('')
  const [validateConfirmPassword, setValidateConfirmPassword] = useState(false)

  const onSend = async () => {
    /* if (email.length === 0) {
      Alert.alert('Complete el campo para continuar')
      return
    }
    try {
      setLoading(true)
      const response = await sendMail({ email })
      if (response.message === RESPONSE_MSG.NOTEMAILTORECOVER) {
        Alert.alert('No existe este email registrado')
      } else {
        navigation.navigate('SendCodeScreen', { email })
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
    } */
  }

  return (
    <Loading loading={ loading }>
      <ScrollView>
        <Header title="Regístrate" icon="keyboard-arrow-left" action={ () => navigation.navigate('IndexScreen') } />
        <View style={ styles.container }>
          <Text style={ styles.txtSubtitle }>Ingresa tu nueva contraseña</Text>
          <InputForm
            label={ 'Nueva Contraseña:' }
            placeholder={ '' }
            valueInput={ password }
            setValueInput={ setPassword }
            validateInput={ validatePassword }
            setValidateInput={ setValidatePassword }
            functionValidation={ handlePassword }
            errorMessage={ 'Escribe una contraseña válida' }
            isPassword
          />
          <InputForm
            label={ 'Confirmar contraseña:' }
            placeholder={ '' }
            valueInput={ confirmPassword }
            setValueInput={ setConfirmPassword }
            validateInput={ validateConfirmPassword }
            setValidateInput={ setValidateConfirmPassword }
            functionValidation={ handlePassword }
            // errorMessage={'Escribe una contraseña válida' }
            isPassword
          />
          {
            password !== confirmPassword
              ? (
                <Text style={ styles.errorMsg }>Las contraseñas no coinciden</Text>
                )
              : null
          }
          <View style={ styles.sessionContainer }>
            <Button title={ 'Enviar' } action={ onSend } />
          </View>
        </View>
      </ScrollView>
    </Loading>
  )
}

export default ChangePasswordScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 100,
    justifyContent: 'space-evenly'
  },
  sessionContainer: {
    height: '50%'
  },
  txtSubtitle: {
    fontFamily: FONTS.ProximaNovaBold,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30
  },
  errorMsg: {
    marginTop: -10,
    fontSize: 15,
    fontFamily: FONTS.ProximaNovaRegular,
    color: 'red'
  }
})
