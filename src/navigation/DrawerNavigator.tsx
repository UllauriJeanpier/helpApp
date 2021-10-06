import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { View, Text } from 'react-native'
import IndexScreen from '../screens/Home/IndexScreen'
import LanguageScreen from '../screens/Home/LanguageScreen'
import NumberScreen from '../screens/Home/NumberScreen'
import ProfileScreen from '../screens/Home/ProfileScreen'

export type RootDrawerParams = {
  IndexScreen: undefined
  ProfileScreen: undefined
  LanguageScreen: undefined
  NumberScreen: undefined
}

const Drawer = createDrawerNavigator<RootDrawerParams>()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName={ 'IndexScreen' } screenOptions={ { headerShown: false } } >
      <Drawer.Screen name="IndexScreen" component={ IndexScreen } />
      <Drawer.Screen name="ProfileScreen" component={ ProfileScreen } />
      <Drawer.Screen name="LanguageScreen" component={ LanguageScreen } />
      <Drawer.Screen name="NumberScreen" component={ NumberScreen }/>
    </Drawer.Navigator>
  )
}

export default DrawerNavigator
