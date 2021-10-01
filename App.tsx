
import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './src/navigation/StackNavigator'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { COLORS, FONTS_TO_LOAD } from './src/utils/constants'
import { useFonts } from 'expo-font'

export default function App () {
  const [loaded] = useFonts(FONTS_TO_LOAD)

  if (!loaded) {
    return null
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar backgroundColor={ COLORS.SECONDARY }/>
        <StackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>

  )
}

const styles = StyleSheet.create({

})
