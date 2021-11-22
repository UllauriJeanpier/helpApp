import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, FONTS } from '../utils/constants'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  option1: string
  option2: string
  onSelectSwitch: (val: any) => void
}

const CustomSwitch = ({
  option1,
  option2,
  onSelectSwitch
}: Props) => {
  const [getSelectionMode, setSelectionMode] = useState('castellano')
  const updatedSwitchData = async (val: any) => {
    setSelectionMode(val)
    onSelectSwitch(val)
    await AsyncStorage.setItem('language', val)
  }
  const sendLng = async() => {
    await AsyncStorage.setItem('language', getSelectionMode)
  }
  useEffect(() => {
    sendLng()
  }, [])

  return (
    <View>
      <View
        style={ styles.container }>
        <TouchableOpacity
          onPress={ () => updatedSwitchData('castellano') }
          style={
            getSelectionMode === 'castellano' ? styles.status1 : styles.status2
          }>
          <Text
            style={ styles.text }>
            { option1 }
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={ () => updatedSwitchData('quechua') }
          style={ getSelectionMode === 'castellano' ? styles.status2 : styles.status1 } >
          <Text
            style={ styles.text }>
            { option2 }
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // height: 35,
    width: '65%',
    backgroundColor: COLORS.BG_GRAY,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  status1: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  status2: {
    flex: 1,
    backgroundColor: COLORS.BG_GRAY,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12
  },
  text: {
    color: 'white',
    fontFamily: FONTS.ProximaNovaBold,
    fontSize: 14
  }
})

export default CustomSwitch
