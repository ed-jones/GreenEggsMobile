/**
 * Author: Edward Jones
 */
import React, { ReactElement } from 'react'
import { Stack } from '../stack'
import { Welcome } from '@greeneggs/screens/auth/welcome'
import { Login } from '@greeneggs/screens/auth/login'
import { Signup } from '@greeneggs/screens/auth/signup'
import { PrivacyPolicy } from '@greeneggs/screens/auth/privacy-policy'
import { LoggedOutRoute } from '../types'

const routes: Array<{ name: LoggedOutRoute; component: () => ReactElement }> = [
  { name: 'Welcome', component: Welcome },
  { name: 'Login', component: Login },
  { name: 'Signup', component: Signup },
  { name: 'Privacy', component: PrivacyPolicy },
]

/**
 * Array containing a list of all routes accessible to logged out users.
 */
export const loggedOutRoutes = routes.map((route) => (
  <Stack.Screen key={route.name} name={route.name} component={route.component} />
))
