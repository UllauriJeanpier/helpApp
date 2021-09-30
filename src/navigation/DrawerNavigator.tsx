import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { View, Text } from 'react-native'
import IndexScreen from '../screens/Auth/IndexScreen'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Test" component={ IndexScreen } />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator
