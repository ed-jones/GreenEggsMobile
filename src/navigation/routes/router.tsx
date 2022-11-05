/**
 * Author: Edward Jones
 */
import { useState, ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { useQuery } from '@apollo/client'
import { Queries } from '@greeneggs/graphql'
import { Me } from '@greeneggs/types/graphql'

import { Stack } from '../stack'
import { loggedInRoutes } from './logged-in-routes'
import { loggedOutRoutes } from './logged-out-routes'
import { LoadingScreen } from '@greeneggs/ui/loading-screen'

enum SessionStates {
  LOADING,
  LOGGED_IN,
  LOGGED_OUT,
}

const sessionStateRouteMap: Record<SessionStates, ReactNode> = {
  [SessionStates.LOADING]: <Stack.Screen name='Loading' component={LoadingScreen} />,
  [SessionStates.LOGGED_IN]: loggedInRoutes,
  [SessionStates.LOGGED_OUT]: loggedOutRoutes,
}

/**
 * Component that switches the accessible routes based on session state.
 */
export function Router() {
  const [sessionState, setSessionState] = useState<SessionStates>(SessionStates.LOADING)
  useQuery<Me>(Queries.getMe, {
    onCompleted: (data) =>
      data?.me.data ? setSessionState(SessionStates.LOGGED_IN) : setSessionState(SessionStates.LOGGED_OUT),
    onError: () => setSessionState(SessionStates.LOGGED_OUT),
  })

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>{sessionStateRouteMap[sessionState]}</Stack.Navigator>
    </NavigationContainer>
  )
}
