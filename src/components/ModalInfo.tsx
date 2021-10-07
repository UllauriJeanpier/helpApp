import React from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Close from '../assets/svg/Closegreen.svg'
import Gps from '../assets/svg/gps.svg'
import { COLORS, FONTS, SCREEN } from '../utils/constants'

interface Props {
  isVisible: boolean
  hideAction: () => void
}

const ModalInfo = ({ isVisible, hideAction }: Props) => {
  return (

    <Modal transparent={ true } visible={ isVisible }>
      <View style={ styles.containerFondo }>
        <View style={ styles.containerModal }>
          <TouchableOpacity
            style={ styles.iconClose }
            onPress={ hideAction }>
            <Close width={ 20 } height={ 20 } />
          </TouchableOpacity>
          <View style={ styles.gpsIconContainer }>
            <Gps width={ '100%' } height={ '65%' } />
          </View>
          <View style={ styles.txtContainer }>
            <Text style={ styles.infoTxt }>
              Para la efectividad del aplicativo
              es importante tener tu ubicación activada
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ModalInfo

const styles = StyleSheet.create({
  containerFondo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000aa'
  },
  containerModal: {
    padding: 15,
    height: '40%',
    width: '85%',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    borderRadius: 20
  },
  iconClose: {
    position: 'absolute',
    padding: 12,
    top: 0,
    right: 0
  },
  gpsIconContainer: {
    flex: 3,
    marginVertical: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoTxt: {
    textAlign: 'center',
    paddingHorizontal: 12,
    fontSize: SCREEN.width * 0.041,
    fontFamily: FONTS.ProximaNovaBold,
    color: COLORS.TEXT_COLOR
  }
})
