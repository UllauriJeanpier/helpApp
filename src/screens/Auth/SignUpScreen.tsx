import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Checkbox from 'expo-checkbox'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Header from '../../components/Header'
import {
  handleName,
  handleAge,
  handleDNI,
  handleDistrict,
  handleEmail,
  handlePassword
} from '../../utils/validateFuntions'

import { RootStackParams } from '../../navigation/StackNavigator'
import InputForm from '../../components/InputForm'
import { COLORS } from '../../utils/constants'
import Button from '../../components/Button'
import { userSignUp } from '../../services/yanapakun/sigup'
import Loading from '../../components/Loading'

interface Props extends NativeStackScreenProps<RootStackParams, 'SignUpScreen'> {
}

const SignUpScreen = ({ navigation }: Props) => {
  const [loading, setLoading] = useState(true)

  const [names, setNames] = useState('')
  const [validateName, setValidateName] = useState(false)

  const [surnames, setSurnames] = useState('')
  const [validateSurname, setValidateSurname] = useState(false)

  const [age, setAge] = useState('')
  const [validateAge, setValidateAge] = useState(false)

  const [DNI, setDNI] = useState('')
  const [validateDNI, setValidateDNI] = useState(false)

  const [district, setDistrict] = useState('')
  const [validateDistrict, setValidateDistrict] = useState(false)

  const [email, setEmail] = useState('')
  const [validateEmail, setValidateEmail] = useState(false)

  const [password, setPassword] = useState('')
  const [validatePassword, setValidatePassword] = useState(false)

  const [confirmPassword, setConfirmPassword] = useState('')
  const [validateConfirmPassword, setValidateConfirmPassword] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  const [phone, setPhone] = useState('')
  const [validatePhone, setValidatePhone] = useState(false)

  const [emergencyNumber, setEmergencyNumber] = useState('')
  const [validateEmergencyNumber, setValidateEmergencyNumber] = useState(false)

  const goToSignIn = () => navigation.navigate('SignInScreen')

  const registro = async () => {
    try {
      setLoading(true)
      await userSignUp({
        email: email,
        password: password,
        roles: ['user'],
        isActive: true,
        firstName: names,
        lastName: surnames,
        age: parseInt(age),
        phone: phone,
        emergencyNumber: emergencyNumber,
        document: DNI,
        district: district,
        gender: '',
        dateBirth: new Date(),
        latitude: '',
        longitude: ''
      })
      setLoading(false)
      goToSignIn()
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <Loading loading={ loading }>
      <ScrollView>
        <Header title="Regístrate" icon="keyboard-arrow-left" action={ () => navigation.navigate('IndexScreen') }/>
        <View style={ styles.container }>
          <InputForm
            label={ 'Nombres:' }
            placeholder={ '' }
            valueInput={ names }
            setValueInput={ setNames }
            validateInput={ validateName }
            setValidateInput={ setValidateName }
            functionValidation={ handleName }
            errorMessage={ 'Escribe un nombre válido' }
        />
          <InputForm
            label={ 'Apellidos:' }
            placeholder={ '' }
            valueInput={ surnames }
            setValueInput={ setSurnames }
            validateInput={ validateSurname }
            setValidateInput={ setValidateSurname }
            functionValidation={ handleName }
            errorMessage={ 'Escribe un apellido válido' }
        />
          <InputForm
            label={ 'Edad:' }
            placeholder={ '' }
            valueInput={ age }
            setValueInput={ setAge }
            validateInput={ validateAge }
            keyboardType="numeric"
            setValidateInput={ setValidateAge }
            functionValidation={ handleAge }
            errorMessage={ 'Escribe una edad válida' }
        />
          <InputForm
            label={ 'Número de DNI:' }
            placeholder={ '' }
            valueInput={ DNI }
            setValueInput={ setDNI }
            validateInput={ validateDNI }
            setValidateInput={ setValidateDNI }
            functionValidation={ handleDNI }
            errorMessage={ 'Escribe un DNI válido' }
        />
          <InputForm
            label={ 'Distrito:' }
            placeholder={ '' }
            valueInput={ district }
            setValueInput={ setDistrict }
            validateInput={ validateDistrict }
            setValidateInput={ setValidateDistrict }
            functionValidation={ handleDistrict }
            errorMessage={ 'Escribe un distrito válido' }
        />

          <InputForm
            label={ 'Correo electrónico:' }
            placeholder={ '' }
            valueInput={ email }
            setValueInput={ setEmail }
            validateInput={ validateEmail }
            setValidateInput={ setValidateEmail }
            functionValidation={ handleEmail }
            errorMessage={ 'Escribe un correo válido' }
        />

          <InputForm
            label={ 'Número de teléfono:' }
            valueInput={ phone }
            setValueInput={ setPhone }
            validateInput={ validatePhone }
            setValidateInput={ setValidatePhone }
            functionValidation={ handleName }
            errorMessage={ 'Escribe un teléfono válido' }
            placeholder={ '' }
        />

          <InputForm
            label={ 'Teléfono de emergencia:' }
            valueInput={ emergencyNumber }
            setValueInput={ setEmergencyNumber }
            validateInput={ validateEmergencyNumber }
            setValidateInput={ setValidateEmergencyNumber }
            functionValidation={ handleName }
            errorMessage={ 'Escribe un teléfono válido' }
            placeholder={ '' }
        />

          <InputForm
            label={ 'Contraseña:' }
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
            errorMessage={ 'Escribe una contraseña válida' }
            isPassword
        />
          <View style={ styles.checkSection }>
            <Checkbox
              style={ styles.checkbox }
              value={ isChecked }
              onValueChange={ setIsChecked }
              color={ COLORS.PRIMARY }
          />
            <Text style={ styles.paragraph }>Acepto términos, condiciones y politicas</Text>
          </View>
          <Button title="Registrarse" action={ registro }/>
          <Text style={ styles.txtInf }>¿Ya estás registrado?{ ' ' }
            <Text style={ styles.boldTxtInfo } onPress={ goToSignIn }>
              Iniciar Sesión
            </Text>
          </Text>
        </View>
      </ScrollView>
    </Loading>

  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 15
  },
  checkSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30.5
  },
  paragraph: {
    fontSize: 13,
    color: COLORS.TEXT_COLOR,
    textAlign: 'justify',
    textDecorationLine: 'underline'
  },
  checkbox: {},
  txtInf: {
    marginVertical: 28,
    color: COLORS.TEXT_COLOR,
    fontSize: 16,
    textAlign: 'center'
  },
  boldTxtInfo: {
    fontWeight: 'bold'
  }
})
