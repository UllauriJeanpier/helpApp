
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Button from '../../components/Button'
import Header from '../../components/Header'
import InputForm from '../../components/InputForm'
import { AuthContext } from '../../context/authContext'
import { RootStackParams } from '../../navigation/StackNavigator'
import { COLORS } from '../../utils/constants'
import { handleEmail, handlePassword } from '../../utils/validateFuntions'
import Loading from '../../components/Loading'

interface Props extends NativeStackScreenProps<RootStackParams, 'SignInScreen'>{}

const SignInScreen = ({ navigation }: Props) => {
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [validateEmail, setValidateEmail] = useState(false)
  const [password, setPassword] = useState('')
  const [validatePassword, setValidatePassword] = useState(false)
  const { signIn } = useContext(AuthContext)

  const goToSignUp = () => navigation.navigate('SignUpScreen')

  const goToIndex = () => navigation.navigate('IndexScreen')

  const login = async () => {
    try {
      setLoading(true)
      await signIn({ email, password })
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(false)
  }, [])
  return (
    <Loading loading={ loading } >
      <ScrollView>
        <Header title="Iniciar sesión" icon='keyboard-arrow-left' action={ goToIndex } />
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
              isPassword
          />
          </View>
          <View style={ styles.sessionContainer }>
            <Text style={ styles.txtInf }>Olvidaste tu contraseña</Text>
            <Button title={ 'Iniciar sesión' } action={ login } />
            <Text style={ [styles.txtInf, styles.decorationNone] }>¿Aún no estás registrado?{ ' ' }
              <Text style={ styles.boldTxtInfo } onPress={ goToSignUp } >
                Regístrate aquí
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </Loading>
  )
}

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
  sessionContainer: {
    height: '50%'
  },
  txtInf: {
    paddingVertical: 20,
    color: COLORS.TEXT_COLOR,
    fontSize: 15,
    textAlign: 'center',
    textDecorationLine: 'underline'
  },
  decorationNone: {
    textDecorationLine: 'none'
  },
  boldTxtInfo: {
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  }
})

export default SignInScreen
