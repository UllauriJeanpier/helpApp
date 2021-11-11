import React, { useContext, useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native'
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'
import { Subscription } from '@unimodules/core'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useNotifications = () => {
  const [expoPushToken, setExpoPushToken] = useState<string>()
  const [notification, setNotification] = useState<Notifications.Notification>()
  const notificationListener = useRef<Subscription>()
  const responseListener = useRef<Subscription>()

  useEffect(() => {
    getPushToken().then(async (pushToken) => {
      if (pushToken) {
        setExpoPushToken(pushToken)
        await AsyncStorage.setItem('tokenNotification', pushToken)
      }
    })

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
            Notifications.addNotificationReceivedListener(setNotification)

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        setNotification(response.notification)
      }
    )

    return () => {
      notificationListener.current &&
          Notifications.removeNotificationSubscription(notificationListener.current)
      responseListener.current &&
          Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  const getPushToken = async () => {
    if (!Constants.isDevice) {
      alert('Debe usar un dispositivo físico para recibir notificaciones')
    }

    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        console.log('No se pudo obtener el permiso para ExpoPushToken')
        return
      }
      return (await Notifications.getExpoPushTokenAsync()).data
    } catch (err) {
      console.log('Hubo un error al obtener el ExpoPushtoken', err)
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C'
      })
    }
  }
}

export default useNotifications
