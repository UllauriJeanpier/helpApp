export interface ILocation {
  status: boolean
  position: IPosition | null
}

export interface IPosition {
  latitude: number
  longitude: number
  latitudeDelta: number
  longitudeDelta: number
}
