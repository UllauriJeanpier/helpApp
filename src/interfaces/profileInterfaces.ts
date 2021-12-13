export interface IProfile {
  id: number
  firstName: string
  lastName: string
  age: number
  document: string
  district: string
  phone: string
  emergencyNumber: string
  gender: string
  dateBirth: Date
  latitude: string
  longitude: string
  createdAt: Date
  updatedAt: Date
  user: IUser
  photo: IPhoto
}

export interface IPhoto {
  id: number
  fieldName: string
  originalName: string
  encoding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
  createdAt: Date
  updatedAt: Date
}

export interface IUser {
  id: number
  email: string
  roles: string[]
  isActive: boolean
  notificationToken: string
  currentHashedRefreshToken: string
  createdAt: Date
  updatedAt: Date
  police: IPolice
}

export interface IPolice {
  id: number
  rank: string
  numberCIP: string
  policeUnit: string
  createdAt: Date
  updatedAt: Date
}
