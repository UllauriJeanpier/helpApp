import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../utils/constants'
interface Props {
  loading: boolean
  children: any
}

const Loading = ({ loading, children }: Props) => {
  if (loading) {
    return (<View style={ [styles.container, styles.horizontal] }>
      <ActivityIndicator size="large" color={ COLORS.PRIMARY }/>
    </View>)
  }
  return children
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

export default Loading
