import React, { useState } from 'react'

import {
  View,
  Text, StyleSheet, TouchableOpacity
} from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import Notification from '../../assets/svg/notification.svg'
import PoliceIcon from '../../assets/svg/Group 3.svg'
import TabAlarma from '../../assets/svg/TabAlarma.svg'
import { SCREEN } from '../../utils/constants'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../../navigation/StackNavigator'

interface Slide {
  img: any
  description: string
}

const items: Slide[] = [
  {
    img: <TabAlarma width={ SCREEN.width * 0.7 } height={ SCREEN.width * 0.7 } />,
    description: 'En caso de necesitar ayuda presiona el botón rojo, de esta forma el aplicativo rastreará tu ubicación automaticamente'
  },
  {
    img: <PoliceIcon width={ SCREEN.width * 0.6 } height={ SCREEN.width * 0.6 } />,
    description: 'La alarma será recibida por la comisaría PNP de Huancavelica y por el personal policial más cercano quienes llegarán a su destino lo antes posible para brindarle ayuda'
  },
  {
    img: <Notification width={ SCREEN.width * 0.6 } height={ SCREEN.width * 0.6 } />,
    description: 'Recuerda que esta alarma debe ser usada solo en caso de emergencías'
  }
]

const renderItem = ({ description, img }: Slide) => {
  return (
    <View style={ styles.slide }>
      { img }
      <Text style={ styles.description }>{ description }</Text>
    </View>
  )
}

interface Props extends NativeStackScreenProps<RootStackParams, 'SignInScreen'>{}

const TutorialScreen = ({ navigation }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const goDrawer = () => navigation.navigate('DrawerNavigator')

  const renderButton = () => {
    const goDrawer = () => navigation.navigate('DrawerNavigator')

    if (activeIndex === 2) { return (
      <TouchableOpacity
        onPress={ goDrawer }
        style={ styles.btnNext }
      >
        <Text style={ styles.textNext }>Siguiente </Text>
        <View style={ styles.iconNext }/>
      </TouchableOpacity>) 
    }
    return null
  }

  return (
    <View
      style={ styles.container }
    >
      <Carousel
        data={ items }
        renderItem={ ({ item }: any) => renderItem(item) }
        sliderWidth={ SCREEN.width }
        itemWidth={ SCREEN.width }
        layout="default"
        onSnapToItem={ (index) => {
          setActiveIndex(index)
        } }
      />
      { renderButton() }
      <Pagination
        dotsLength={ items.length }
        dotStyle={ styles.pagination }
        activeDotIndex={ activeIndex }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF7',
    paddingVertical: 50
  },
  slide: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  description: {
    top: 75,
    fontSize: 17,
    textAlign: 'center',
    color: '#3A413D',
    fontWeight: 'bold',
    lineHeight: 21.92
  },
  pagination: {
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: '#3A413D'
  },
  btnNext: {
    position: 'absolute',
    right:20,
    top: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textNext: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3A413D'
  },
  iconNext: {
    width: 8,
    height: 8,
    borderBottomWidth: 2,
    borderEndWidth: 2,
    transform: [{ rotateZ: "-45deg" }]
  }
})

export default TutorialScreen
