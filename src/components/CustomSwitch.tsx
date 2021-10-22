import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTS } from '../utils/constants'

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
  const [getSelectionMode, setSelectionMode] = useState(1)

  const updatedSwitchData = (val: any) => {
    setSelectionMode(val)
    onSelectSwitch(val)
  }

  return (
    <View>
      <View
        style={ styles.container }>
        <TouchableOpacity
          onPress={ () => updatedSwitchData(1) }
          style={
            getSelectionMode === 1 ? styles.status1 : styles.status2
          }>
          <Text
            style={ styles.text }>
            { option1 }
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={ () => updatedSwitchData(2) }
          style={ getSelectionMode === 1 ? styles.status2 : styles.status1 } >
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
    height: 35,
    width: '60%',
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
    paddingHorizontal: 12
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
