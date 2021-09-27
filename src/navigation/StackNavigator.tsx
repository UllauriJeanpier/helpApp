
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from '../screens/Auth/SignInScreen'
import SignUpScreen from '../screens/Auth/SignUpScreen'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ 'SignIn' } screenOptions={ { headerShown: false } } >
      <Stack.Screen name="SignIn" component={ SignInScreen } />
      <Stack.Screen name="SignUp" component={ SignUpScreen } />
    </Stack.Navigator>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})
