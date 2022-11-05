/**
 * Author: Edward Jones
 */
import { Background } from '@greeneggs/ui/background'
import { TopNavigation } from '@greeneggs/ui/top-navigation'
import React from 'react'
import { WebView } from 'react-native-webview'

/**
 * Screen that displays the Green Eggs privacy policy in a web view.
 */
export function PrivacyPolicy() {
  return (
    <Background>
      <TopNavigation title='Privacy Policy' />
      <WebView source={{ uri: 'https://greeneggs.app/privacy' }} />
    </Background>
  )
}
