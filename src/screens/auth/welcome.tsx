/**
 * Author: Edward Jones
 */
import React, { ReactElement } from 'react'
import { View, Image, StyleSheet, ImageBackground } from 'react-native'
import { Text, Button } from '@ui-kitten/components'
import Logo from '../../assets/images/icon.png'
import Banner from '../../assets/images/banner.jpg'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import { Background } from '@greeneggs/ui/background'
import { useNavigation } from '@react-navigation/native'
import { LoggedOutNavigationProp } from '@greeneggs/navigation/types'

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
  },
  banner: {
    resizeMode: 'cover',
    height: '100%',
    justifyContent: 'flex-end',
  },
  bannerContainer: {
    height: '50%',
  },
  bannerContent: {
    alignItems: 'center',
    paddingBottom: 64,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  buttonContainer: {
    padding: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '50%',
  },
  button: {
    marginBottom: 8,
  },
  view: {
    height: '100%',
  },
  centerText: {
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
})

/**
 * Screen that welcomes the user to the Green Eggs app.
 * This is the first screen a user sees upon opening the app.
 * Instructs a user to sign up or log in.
 */
export function Welcome(): ReactElement {
  const navigation = useNavigation<LoggedOutNavigationProp>()
  return (
    <Background
      style={{
        ...styles.view,
      }}
    >
      <StatusBar style='light' />
      <View style={styles.bannerContainer}>
        <ImageBackground source={Banner} style={styles.banner}>
          <LinearGradient colors={['transparent', 'rgba(247, 249, 252,1)']} style={styles.gradient} />
          <View style={styles.bannerContent}>
            <Image source={Logo} style={styles.logo} />
            <Text category='h1'>Green Eggs</Text>
            <Text category='s1'>A friendly recipe sharing experience</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.buttonContainer}>
        <View>
          <Button style={styles.button} onPress={() => navigation.navigate('Signup')} status='success'>
            CREATE ACCOUNT
          </Button>
          <Button style={styles.button} onPress={() => navigation.navigate('Login')} status='basic'>
            LOGIN
          </Button>
        </View>
      </View>
    </Background>
  )
}
