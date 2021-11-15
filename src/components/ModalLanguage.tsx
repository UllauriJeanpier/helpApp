import React, { useState, useEffect } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Close from '../assets/svg/Closegreen.svg'
import Idioma from '../assets/svg/idioma.svg'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  isVisible: boolean
  hideAction: () => void
}

const ModalLanguage = ({ isVisible, hideAction }: Props) => {
  
  const [language, changeLanguage] = useState("castellano")

  const getLng = async () => {
    const lng = await AsyncStorage.getItem('language')
    if (lng !== null) {
      changeLanguage(lng)
    }
  }
  const cngLng = async (l:string) => {
    await AsyncStorage.setItem('language', l)
    changeLanguage(l)
  }
  useEffect(() => {
    getLng()
  }, [])
  return (

    <Modal transparent={ true } visible={ isVisible }>
      <View style={ styles.containerFondo }>
        <View style={ styles.containerModal }>
          <Text style={ styles.text }> Cambiar idioma </Text>
          <TouchableOpacity
            style={ styles.iconClose }
            onPress={ hideAction }>
            <Close width={ 24 } height={ 24 } />
          </TouchableOpacity>
          <View style={ styles.mssgIconContainer }>
            <Idioma width={ 100 } height={ 100 } />
          </View>
          <View>
              <TouchableOpacity 
                onPress={ () => cngLng("castellano") }
                style={[styles.btn, styles.btnCastellano,
                  language === "castellano" ? styles.btnActive : styles.btn]
                }
              >
                  <Text style={ styles.btnText }>Castellano</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={ () => cngLng("quechua") }
                style={[styles.btn,
                  language === "quechua" ? styles.btnActive : styles.btn]
                 }
              >
                  <Text style={ styles.btnText }>Quechua</Text>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ModalLanguage

const styles = StyleSheet.create({
  containerFondo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000aa'
  },
  containerModal: {
    padding: 15,
    width: '85%',
    justifyContent: 'space-evenly',
    backgroundColor: '#FFFCF7',
    borderRadius: 20
  },
  iconClose: {
    position: 'absolute',
    padding: 12,
    top: 0,
    right: 0
  },
  text: {
    color: '#3A413D',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30
  },
  mssgIconContainer: {
    marginTop: 20,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 15,
      backgroundColor: '#7F7D7B',
      borderRadius: 25
  },
  btnActive:{
    backgroundColor: '#216D3F'
  },
  btnCastellano: {
      marginBottom: 15
  },
  btnText: {
      fontSize: 16,
      color: '#FFFCF7',
      fontWeight: 'bold'
  }
})
