/**
 * Author: Edward Jones
 */
import * as React from 'react';
import { View, ImageBackground, Image, ScrollView } from 'react-native'
import { Text, useTheme } from '@ui-kitten/components'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import { logo, banner } from '@greeneggs/assets'
import { Background } from '@greeneggs/ui/background'
import { TopNavigation } from '@greeneggs/ui/top-navigation'
import { Callout } from '@greeneggs/ui/callout'

interface IAuthPageTemplateProps {
  message: string
  children: React.ReactNode
  errorMessage?: string
}

/**
 * Template screen for all authentication screens.
 * Shows the brand logo and background, followed by a form.
 */
export function AuthPageTemplate({ message, errorMessage, children }: IAuthPageTemplateProps) {
  const theme = useTheme()
  return (
    <Background>
      <StatusBar style='dark' />
      <View style={{ height: 200, justifyContent: 'center' }}>
        <ImageBackground source={banner} style={{ height: '100%', justifyContent: 'flex-start' }}>
          <LinearGradient
            colors={['rgba(247, 249, 252,0.5)', 'rgba(247, 249, 252,1)']}
            style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '100%' }}
          />
          <TopNavigation />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text category='h1'>Green Eggs</Text>
            <Image source={logo} style={{ width: 48, height: 48, margin: 10 }} />
          </View>
          <Text style={{ textAlign: 'center' }} category='s1'>
            {message}
          </Text>
        </ImageBackground>
      </View>
      <ScrollView
        style={{
          paddingHorizontal: 10,
          backgroundColor: theme['color-basic-200'],
        }}
      >
        {errorMessage && <Callout message={errorMessage} type='danger' style={{ marginVertical: 16 }} />}
        {children}
      </ScrollView>
    </Background>
  )
}
