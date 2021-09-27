
import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './src/navigation/StackNavigator'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { COLORS } from './src/utils/constants'

export default function App () {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar backgroundColor={ COLORS.PRIMARY }/>
        <StackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>

  )
}

const styles = StyleSheet.create({

})
