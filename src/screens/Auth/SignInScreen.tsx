import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import ChevronSvg from '../../assets/icons/ChevronSvg'
import Header from '../../components/Header'

const SignInScreen = () => {
  return (
    <ScrollView>
      <Header title="Login"/>
      <View>
        <Text>SignUpScreen Prueba </Text>
      </View>
    </ScrollView>
  )
}

export default SignInScreen

const styles = StyleSheet.create({})
