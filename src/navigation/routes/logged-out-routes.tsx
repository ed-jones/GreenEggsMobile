/**
 * Author: Edward Jones
 */
import React from 'react'
import { Stack } from '../stack'
import * as Screens from '../../screens'

/**
 * Array containing a list of all routes accessible to logged out users.
 */
export const LoggedOutRoutes = [
  <Stack.Screen name='Welcome' component={Screens.Welcome} key='Welcome' />,
  <Stack.Screen name='Login' component={Screens.Login} key='Login' />,
  <Stack.Screen name='Signup' component={Screens.Signup} key='Signup' />,
  <Stack.Screen name='Privacy' component={Screens.PrivacyPolicy} key='Privacy' />,
]
