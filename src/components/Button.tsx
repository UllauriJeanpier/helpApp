import React from 'react'
import { StyleSheet, Text, TextStyle, TouchableOpacity, View } from 'react-native'
import { COLORS, FONTS } from '../utils/constants'

interface Props {
  title: string
  action: () => void
  customStyles?: TextStyle
}

const Button = ({ title, action, customStyles }: Props) => {
  return (
    <TouchableOpacity style={ [styles.btn, customStyles] } onPress={ action }>
      <Text style={ styles.text }>{ title }</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    height: 50,
    marginVertical: 30.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 40
  },
  text: {
    color: 'white',
    fontFamily: FONTS.ProximaNovaBold
  }
})
