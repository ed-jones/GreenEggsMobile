import { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { ApolloError, useQuery } from '@apollo/client'
import { Queries } from '@greeneggs/graphql'
import { Me } from '@greeneggs/types/graphql'

import { Stack } from '../stack'
import { loggedInRoutes } from './logged-in-routes'
import { loggedOutRoutes } from './logged-out-routes'
import { LoadingScreen } from '@greeneggs/ui/loading-screen'
import { Unverified } from '@greeneggs/screens/unverified'
import { AuthError } from '@greeneggs/screens/auth-error'

const routes = {
  loading: <Stack.Screen name='Loading' component={LoadingScreen} />,
  loggedIn: loggedInRoutes,
  loggedOut: loggedOutRoutes,
  unverified: <Stack.Screen name='Unverified' component={Unverified} />,
}

/**
 * Component that switches the accessible routes based on session state.
 */
export function Router() {
  const [sessionState, setSessionState] = useState<keyof typeof routes>('loading')
  const [error, setError] = useState<ApolloError | undefined>()
  useQuery<Me>(Queries.getMe, {
    onCompleted: ({ me }) => {
      me.data
        ? me.data.verified
          ? setSessionState('loggedIn')
          : setSessionState('unverified')
        : setSessionState('loggedOut')
      setError(undefined)
    },
    onError: (error) => setError(error),
    pollInterval: sessionState === 'unverified' || error ? 5000 : undefined,
  })

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {error ? (
          <Stack.Screen name='Error'>{() => <AuthError message={error.message} />}</Stack.Screen>
        ) : (
          routes[sessionState]
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
