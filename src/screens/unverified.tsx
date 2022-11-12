import { AuthContext } from '@greeneggs/context'
import { Background } from '@greeneggs/ui/background'
import { Callout } from '@greeneggs/ui/callout'
import { ReactElement, useContext } from 'react'
import { View } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { TopNavigation } from '@greeneggs/ui/top-navigation'

export function Unverified(): ReactElement {
  const { setToken } = useContext(AuthContext)
  return (
    <Background>
      <TopNavigation
        onGoBack={() => {
          void SecureStore.deleteItemAsync('token').then(() => {
            setToken && setToken(null)
          })
        }}
      />
      <View
        style={{
          marginHorizontal: 10,
        }}
      >
        <Callout message='Please verify your email by clicking the confirmation link we just sent you.' type='info' />
      </View>
    </Background>
  )
}
