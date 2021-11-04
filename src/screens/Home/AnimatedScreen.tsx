import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated';

import PoliceIcon from '../../assets/svg/Group 3.svg'
import Alarma from '../../assets/svg/Alarma2.svg'

import Header from '../../components/Header';
import { FONTS, SCREEN } from '../../utils/constants';

export const AnimatedScreen = ({ navigation } : any) => {
    const [showAnimated, setShowAnimated] = useState(true)
    const openMenu = () => {
        navigation.toggleDrawer()
      }
    const scale = useSharedValue(1.8)
    const animatedStyle = useAnimatedStyle(()=>{
        return {
          borderRadius: 100,
          transform: [{scale: scale.value}]
        }
    })
    useEffect(() => {
        scale.value = withRepeat(withSpring(1.2), -1, true)
        setTimeout(() => {
            setShowAnimated(false)
        }, 3000);
    }, [])

    return (
        <>
        <Header title='Yanapakun Policía' />
        <View style={ styles.containerWait }>
          { showAnimated! ?
            <View style= { styles.boxAnimated }>
                <Animated.View style={ [styles.box, animatedStyle] }/>
                <View style={styles.img }>
                    <Alarma height={ 120 } width={ 120 }/>
                </View>
            </View>
            :
            <>
              <Text style={ styles.txtSecure }> Espera en un lugar seguro </Text>
              <PoliceIcon style={ styles.imgPolice } width={ SCREEN.width * 0.6 } height={ SCREEN.width * 0.6 } />
              <Text style={ styles.txtHelp }>LA AYUDA VA EN CAMINO</Text>
            </>
          }
        </View> 
        </>
    )
}

const styles = StyleSheet.create({
    containerWait: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center' 
      },
      imgPolice: {
        marginVertical: 57
      },
      txtSecure: {
        fontSize: 20,
        color: '#000',
        fontFamily: FONTS.ProximaNovaBold
      },
      txtHelp: {
        color: '#E30027',
        fontSize: 22,
        fontFamily: FONTS.ProximaNovaExtrabold
      },
    
      // ANIMATION
      boxAnimated: {
        width: 190,
        height: 190,
        justifyContent: 'center',
        alignItems: 'center'
      },
      img: {
        position: 'absolute',
        backgroundColor: '#FFBDBD',
        borderRadius: 100,
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
      },
      box: {
        height: 190,
        width: 190,
        backgroundColor: '#FFE3E1'
      }
})