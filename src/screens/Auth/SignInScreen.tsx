import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import Button from '../../components/Button'
import Header from '../../components/Header'
import InputForm from '../../components/InputForm'
import { RootStackParams } from '../../navigation/StackNavigator'
import { COLORS } from '../../utils/constants'

interface Props extends NativeStackScreenProps<RootStackParams, 'SignInScreen'>{}

const SignInScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('')
  const [validateEmail, setValidateEmail] = useState(false)
  const [password, setPassword] = useState('')
  const [validatePassword, setValidatePassword] = useState(false)

  const handleEmail = (text: string) => {
    // eslint-disable-next-line no-control-regex
    const regexEmail = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
    if (regexEmail.test(String(text).toLowerCase())) { return true } else { return false }
  }

  const handlePassword = (text: string) => {
    if (text.length < 8) {
      return false
    } else {
      return true
    }
  }

  const goToSignUp = () => {
    navigation.navigate('SignUpScreen')
  }

  const login = () => {
    console.log('Logeando')
  }

  return (
    <>
      <Header title="Iniciar sesión"/>
      <View style={ styles.container }>
        <View style={ styles.inputsContainer }>
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
          <InputForm
            label={ 'Contraseña:' }
            placeholder={ 'Escriba su contraseña' }
            valueInput={ password }
            setValueInput={ setPassword }
            validateInput={ validatePassword }
            setValidateInput={ setValidatePassword }
            functionValidation={ handlePassword }
            errorMessage={ 'Escribe una contraseña válida' }
          />
        </View>
        <View style={ styles.sesionContainer }>
          <Text style={ styles.txtInf }>Olvidaste tu contraseña</Text>
          <Button title={ 'Iniciar sesión' } action={ login } />
          <Text style={ styles.txtInf }>¿No estás registrado?
            <Text style={ styles.boldTxtInfo } onPress={ goToSignUp } >
              Regístrate
            </Text>
          </Text>
        </View>

      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-evenly'
    /* alignItems: '',
    justifyContent: 'center' */
  },
  inputsContainer: {
    height: '50%',
    justifyContent: 'center'
    // backgroundColor: 'red'
  },
  sesionContainer: {
    height: '50%'
    // backgroundColor: 'blue'
  },
  txtInf: {
    marginVertical: 15,
    color: COLORS.PRIMARY,
    fontSize: 15,
    textAlign: 'center'
  },
  boldTxtInfo: {
    fontWeight: 'bold'
  }
})

export default SignInScreen
