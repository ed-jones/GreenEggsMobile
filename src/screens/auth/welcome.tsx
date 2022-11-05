/**
 * Author: Edward Jones
 */
import React, { ReactElement } from 'react'
import { View, Image, ImageBackground } from 'react-native'
import { Text, Button } from '@ui-kitten/components'
import Logo from '../../assets/images/icon.png'
import Banner from '../../assets/images/banner.jpg'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import { Background } from '@greeneggs/ui/background'
import { useNavigation } from '@react-navigation/native'
import { LoggedOutNavigationProp } from '@greeneggs/navigation/types'

/**
 * Screen that welcomes the user to the Green Eggs app.
 * This is the first screen a user sees upon opening the app.
 * Instructs a user to sign up or log in.
 */
export function Welcome(): ReactElement {
  const navigation = useNavigation<LoggedOutNavigationProp>()
  return (
    <Background style={{ height: '100%' }}>
      <StatusBar style='light' />
      <View style={{ height: '50%' }}>
        <ImageBackground source={Banner} style={{ height: '100%', justifyContent: 'flex-end' }}>
          <LinearGradient
            colors={['transparent', 'rgba(247, 249, 252,1)']}
            style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '100%' }}
          />
          <View style={{ alignItems: 'center', paddingBottom: 64 }}>
            <Image source={Logo} style={{ width: 150, height: 150 }} />
            <Text category='h1'>Green Eggs</Text>
            <Text category='s1'>A friendly recipe sharing experience</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={{ padding: 16, flexDirection: 'column', justifyContent: 'space-between', height: '50%' }}>
        <View>
          <Button style={{ marginBottom: 8 }} onPress={() => navigation.navigate('Signup')} status='success'>
            CREATE ACCOUNT
          </Button>
          <Button style={{ marginBottom: 8 }} onPress={() => navigation.navigate('Login')} status='basic'>
            LOGIN
          </Button>
        </View>
      </View>
    </Background>
  )
}
