import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS, FONTS } from '../utils/constants'

interface Props {
  title: string
  hasDrawer?: boolean
}

const Header = ({ title }: Props) => {
  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>{ title }</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
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
  }
})
