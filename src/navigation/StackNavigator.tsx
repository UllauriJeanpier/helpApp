
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import IndexScreen from '../screens/Auth/IndexScreen'
import SignUpScreen from '../screens/Auth/SignUpScreen'
import DrawerNavigator from './DrawerNavigator'
import SignInScreen from '../screens/Auth/SignInScreen'

export type RootStackParams = {
  IndexScreen: undefined
  SignUpScreen: undefined
  SignInScreen: undefined
  DrawerNavigator: undefined
}

const Stack = createNativeStackNavigator<RootStackParams>()

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ 'IndexScreen' } screenOptions={ { headerShown: false } } >
      <Stack.Screen name="IndexScreen" component={ IndexScreen } />
      <Stack.Screen name="SignInScreen" component={ SignInScreen } />
      <Stack.Screen name="SignUpScreen" component={ SignUpScreen } />
      <Stack.Screen name='DrawerNavigator' component={ DrawerNavigator }/ >
    </Stack.Navigator>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})
