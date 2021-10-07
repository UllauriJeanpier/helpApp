/* eslint-disable react-native/no-inline-styles */

import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView
} from '@react-navigation/drawer'
import HomeScreen from '../screens/Home/HomeScreen'
import LanguageScreen from '../screens/Home/LanguageScreen'
import NumberScreen from '../screens/Home/NumberScreen'
import ProfileScreen from '../screens/Home/ProfileScreen'
import DrawerLogo from '../assets/svg/Logo.svg'
import { COLORS, FONTS } from '../utils/constants'

export type RootDrawerParams = {
  HomeScreen: undefined
  ProfileScreen: undefined
  LanguageScreen: undefined
  NumberScreen: undefined
}

const Drawer = createDrawerNavigator<RootDrawerParams>()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName={ 'HomeScreen' }
      screenOptions={ { headerShown: false } }
      drawerContent={ props => <CustomDrawer { ...props } /> } >
      <Drawer.Screen name="HomeScreen" component={ HomeScreen } />
      <Drawer.Screen name="ProfileScreen" component={ ProfileScreen } />
      <Drawer.Screen name="LanguageScreen" component={ LanguageScreen } />
      <Drawer.Screen name="NumberScreen" component={ NumberScreen } />
    </Drawer.Navigator>
  )
}

const CustomDrawer = ({ navigation }: DrawerContentComponentProps) => {
  return (

    <View style={ styles.container }>
      <View style={ styles.iconContainer }>
        <DrawerLogo width={ '60%' } height={ 100 } />
      </View>
      { /* Opciones  */ }
      <View style={ styles.optionsContainer }>
        <View>
          <BtnOption
            title={ 'Inicio' }
            action={ () => navigation.navigate('HomeScreen') } />
          <BtnOption
            title={ 'Perfil' }
            action={ () => navigation.navigate('ProfileScreen') } />
          <BtnOption
            title={ 'Cambiar idioma' }
            action={ () => navigation.navigate('LanguageScreen') } />
          <BtnOption
            title={ 'Números de ayuda' }
            action={ () => navigation.navigate('NumberScreen') } />
        </View>
        <BtnOption
          title={ 'Cerrar sesión' }
          isLogoutOption
          action={ () => navigation.navigate('IndexScreen') } />
      </View>
    </View>
  )
}

/*****************************************/

// Button Option

interface BtnOptionsProps {
  title: string
  isLogoutOption?: boolean
  action?: () => void
}

const BtnOption = ({ title, isLogoutOption, action }: BtnOptionsProps) => {
  return (
    <TouchableOpacity
      style={
        [styles.btnOption, !isLogoutOption && styles.btnCommonOption] }
      onPress={ action }
    >
      <Text style={ {
        ...styles.textBtn,
        textDecorationLine: isLogoutOption ? 'underline' : 'none'
      } }>
        { title }
      </Text>
    </TouchableOpacity>
  )
}

/*****************************************/

export default DrawerNavigator

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  iconContainer: {
    width: '100%',
    paddingBottom: 20
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  btnOption: {
    marginVertical: 10,
    paddingVertical: 4
  },
  btnCommonOption: {
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.PRIMARY
  },
  textBtn: {
    fontFamily: FONTS.ProximaNovaBold,
    color: COLORS.TEXT_COLOR
  }
})
