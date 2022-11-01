/**
 * Author: Edward Jones
 */
import { Background, TopNavigation } from '@greeneggs/ui'
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
