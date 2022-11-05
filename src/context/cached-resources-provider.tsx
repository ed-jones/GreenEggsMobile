/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/**
 * Author: Edward Jones
 */
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { logo } from '@greeneggs/assets'
import { Image, View } from 'react-native'

/**
 * Hook that loads and provides loading state for cached resources, including fonts.
 */
function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        void SplashScreen.preventAutoHideAsync()

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'Lato-Black': require('@greeneggs/assets/fonts/Lato-Black.ttf'),
          'Lato-BlackItalic': require('@greeneggs/assets/fonts/Lato-BlackItalic.ttf'),
          'Lato-Bold': require('@greeneggs/assets/fonts/Lato-Bold.ttf'),
          'Lato-BoldItalic': require('@greeneggs/assets/fonts/Lato-BoldItalic.ttf'),
          'Lato-Italic': require('@greeneggs/assets/fonts/Lato-Italic.ttf'),
          'Lato-Light': require('@greeneggs/assets/fonts/Lato-Light.ttf'),
          'Lato-LightItalic': require('@greeneggs/assets/fonts/Lato-LightItalic.ttf'),
          'Lato-Regular': require('@greeneggs/assets/fonts/Lato-Regular.ttf'),
          'Lato-Thin': require('@greeneggs/assets/fonts/Lato-Thin.ttf'),
          'Lato-ThinItalic': require('@greeneggs/assets/fonts/Lato-ThinItalic.ttf'),
          'Lato-SemiBold': require('@greeneggs/assets/fonts/Lato-SemiBold.ttf'),
          'RobotoSlab-Medium': require('@greeneggs/assets/fonts/RobotoSlab-Medium.ttf'),
        })
      } finally {
        setLoadingComplete(true)
        void SplashScreen.hideAsync()
      }
    }

    void loadResourcesAndDataAsync()
  }, [])

  return isLoadingComplete
}

export function CachedResourcesProvider({ children }: PropsWithChildren<object>) {
  const isLoadingComplete = useCachedResources()
  if (!isLoadingComplete) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image source={logo} style={{ width: 100, height: 100 }} />
      </View>
    )
  }
  return <>{children}</>
}
