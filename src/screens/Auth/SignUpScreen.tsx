import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Header from '../../components/Header'
import {
  handleName,
  handleAge,
  handleDNI,
  handleDistrit,
  handleEmail,
  handlePassword
} from '../../utils/validateFuntions'

import { RootStackParams } from '../../navigation/StackNavigator'
import InputForm from '../../components/InputForm'

interface Props extends NativeStackScreenProps<RootStackParams, 'SignUpScreen'>{}

const SignUpScreen = ({ navigation }: Props) => {
  const [names, setNames] = useState('')
  const [validateName, setValidateName] = useState(false)
  const [surnames, setSurnames] = useState('')
  const [validateSurname, setValidateSurname] = useState(false)
  const [age, setAge] = useState('')
  const [validateAge, setValidateAge] = useState(false)
  const [DNI, setDNI] = useState('')
  const [validateDNI, setValidateDNI] = useState(false)
  const [distrit, setDistrit] = useState('')
  const [validateDistrit, setValidateDistrit] = useState(false)
  const [email, setEmail] = useState('')
  const [validateEmail, setValidateEmail] = useState(false)
  const [password, setPassword] = useState('')
  const [validatePassword, setValidatePassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validateConfirmPassword, setValidateConfirmPassword] = useState(false)

  return (
    <ScrollView>
      <Header title="Regístrate"/>
      <View style={ styles.container }>
        <InputForm
          label={ 'Nombres:' }
          placeholder={ 'Nombres' }
          valueInput={ names }
          setValueInput={ setNames }
          validateInput={ validateName }
          setValidateInput={ setValidateName }
          functionValidation={ handleName }
          errorMessage={ 'Escribe un nombre válido' }
        />
        <InputForm
          label={ 'Apellidos:' }
          placeholder={ 'Apellidos' }
          valueInput={ surnames }
          setValueInput={ setSurnames }
          validateInput={ validateSurname }
          setValidateInput={ setValidateSurname }
          functionValidation={ handleName }
          errorMessage={ 'Escribe un apellido válido' }
        />
        <InputForm
          label={ 'Edad:' }
          placeholder={ 'Edad' }
          valueInput={ age }
          setValueInput={ setAge }
          validateInput={ validateAge }
          keyboardType= 'numeric'
          setValidateInput={ setValidateAge }
          functionValidation={ handleAge }
          errorMessage={ 'Escribe una edad válida' }
        />
        <InputForm
          label={ 'Número de DNI:' }
          placeholder={ 'DNI' }
          valueInput={ DNI }
          setValueInput={ setDNI }
          validateInput={ validateDNI }
          setValidateInput={ setValidateDNI }
          functionValidation={ handleDNI }
          errorMessage={ 'Escribe un DNI válido' }
        />
      </View>
    </ScrollView>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'red'
    /* alignItems: '',
    justifyContent: 'center' */
  }
})
