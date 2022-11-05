/**
 * Author: Edward Jones
 */
import { ReactElement } from 'react';
import { Spinner } from '@ui-kitten/components'
import { Background } from './background'

/**
 * Screen to display when main content is loading.
 * Displays a centered spinning animation.
 */
export function LoadingScreen(): ReactElement {
  return (
    <Background style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Spinner />
    </Background>
  )
}
