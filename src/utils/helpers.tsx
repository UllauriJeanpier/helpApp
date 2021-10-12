import * as Location from 'expo-location'
import { Alert } from 'react-native'
import { ILocation } from '../interfaces/locationInterface'

export const getCurrentLocation = async () => {
  const location: ILocation = {
    status: false,
    position: null
  }
  const { status } = await Location.requestForegroundPermissionsAsync()
  if (status === 'denied') return location
  /* Alert.alert('Debes dar permisos para la localizacion') */

  const { coords } = await Location.getCurrentPositionAsync({})
  location.status = true

  location.position = {
    latitude: coords.latitude,
    longitude: coords.longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001
  }

  return location
}
