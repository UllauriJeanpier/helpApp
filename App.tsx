
import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './src/navigation/StackNavigator'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { COLORS, FONTS_TO_LOAD } from './src/utils/constants'
import { useFonts } from 'expo-font'
import * as Notifications from 'expo-notifications'
import useNotifications from './src/hooks/useNotifications'

// Function that decides whether the notification is displayed or not

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
})

export default function App () {
  const [loaded] = useFonts(FONTS_TO_LOAD)

  // Push Notifications config hook
  useNotifications()

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
