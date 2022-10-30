/**
 * Author: Edward Jones
 */
import React from 'react'
import { Stack } from '../stack'
import * as Screens from '../../screens'
import { StackNavigationProp } from '@react-navigation/stack'

export type LoggedOutRoute = typeof routes[number]['name']

export type LoggedOutNavigationProp = StackNavigationProp<LoggedOutRouteParams>

export type LoggedOutRouteParams = {
  [key in LoggedOutRoute]: undefined
}

const routes = [
  { name: 'Welcome', component: Screens.Welcome },
  { name: 'Login', component: Screens.Login },
  { name: 'Signup', component: Screens.Signup },
  { name: 'Privacy', component: Screens.PrivacyPolicy },
] as const

/**
 * Array containing a list of all routes accessible to logged out users.
 */
export const loggedOutRoutes = routes.map((route) => (
  <Stack.Screen key={route.name} name={route.name} component={route.component} />
))
