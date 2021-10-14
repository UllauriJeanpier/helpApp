import React from 'react'
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native'
import Header from '../../components/Header'

const NumberScreen = () => {
  return (
    <SafeAreaView style={ styles.container }>
      <Header title="Número de ayuda"/>
      <View style={ styles.body }>
        <Text style={ styles.description }>
          A traves de estos números de teléfonos usted
          podrá solicitar ayuda y realizar denuncias
        </Text>
        <View style={ styles.number }>
          <Text style={ styles.text }>Teléfono:</Text>
          <TouchableOpacity
            style={ styles.button }
            onPress={ async () => await Linking.openURL('tel:+067451520') }
          >
            <Text style={ styles.buttonText }>067 451520</Text>
          </TouchableOpacity>
        </View>
        <View style={ styles.number }>
          <Text style={ styles.text }>Whatsapp:</Text>
          <TouchableOpacity
            style={ styles.button }
            onPress={ async () => await Linking.openURL('https://wa.link/bqgp1z') }
          >
            <Text style={ styles.buttonText }>980 121 194</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default NumberScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF7'
  },
  body: {
    paddingTop: 25,
    paddingHorizontal: 28
  },
  description: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 26
  },
  number: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#216D3F',
    borderBottomWidth: 1,
    paddingVertical: 30
  },
  text: {
    color: '#3A413D',
    fontSize: 16,
    fontWeight: 'bold'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#216D3F',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 170
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
})
