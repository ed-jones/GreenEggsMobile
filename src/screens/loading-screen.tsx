/**
 * Author: Edward Jones
 */
import React, { ReactElement } from 'react'
import { Spinner } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import { Background } from '@greeneggs/ui'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

/**
 * Screen to display when main content is loading.
 * Displays a centered spinning animation.
 */
export function LoadingScreen(): ReactElement {
  return (
    <Background style={styles.container}>
      <Spinner />
    </Background>
  )
}
