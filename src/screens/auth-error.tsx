import { Background } from '@greeneggs/ui/background'
import { Callout } from '@greeneggs/ui/callout'
import { ReactElement } from 'react'
import { View } from 'react-native'

interface Props {
  message: string
}

export function AuthError({ message }: Props): ReactElement {
  return (
    <Background>
      <View style={{ marginHorizontal: 10, justifyContent: 'center', height: '100%' }}>
        <Callout message={`Error: ${message}`} type='danger' />
      </View>
    </Background>
  )
}
