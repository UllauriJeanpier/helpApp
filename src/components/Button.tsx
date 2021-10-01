import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, FONTS } from '../utils/constants'

interface Props {
  title: string
  action: () => void
}

const Button = ({ title, action }: Props) => {
  return (
    <TouchableOpacity style={ styles.btn } onPress={ action }>
      <Text style={ styles.text }>{ title }</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    height: 50,
    marginVertical: 12,
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
