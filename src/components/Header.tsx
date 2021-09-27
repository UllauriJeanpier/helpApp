import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../utils/constants'
import Chevron from '../assets/svg/Alerta.svg'

interface Props {
  title: string
  hasDrawer?: boolean
}

const Header = ({ title }: Props) => {
  return (
    <View style={ styles.container }>
      <Text>{ title }</Text>
      <Chevron width={ 60 } height={ 50 } />
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
  }
})
