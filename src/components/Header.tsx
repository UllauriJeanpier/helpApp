import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, FONTS } from '../utils/constants'
import { MaterialIcons } from '@expo/vector-icons'

interface Props {
  title: string
  hasDrawer?: boolean
  hasReturn?: boolean
  icon?: 'keyboard-arrow-left' | 'menu'
  action?: () => void
}
const Header = ({ title, icon, action }: Props) => {
  return (
    <View style={ styles.header }>
      <TouchableOpacity style={ styles.opacity } onPress={ action } >
        <MaterialIcons name={ icon } size={ 28 } style={ styles.icon } />
      </TouchableOpacity>
      <Text style={ styles.title }>{ title }</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 65,
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontFamily: FONTS.ProximaNovaBold
  },
  opacity: {
    position: 'absolute',
    left: 25
  },
  icon: {
    color: 'white'
  }
})
