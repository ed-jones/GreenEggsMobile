/**
 * Author: Edward Jones
 */
import React from 'react';
import { Stack } from '../stack';
import * as Screens from "../../screens";

export const LoggedOutRoutes = [
  <Stack.Screen name="Welcome" component={Screens.Welcome} />,
  <Stack.Screen name="Login" component={Screens.Login} />,
  <Stack.Screen name="Signup" component={Screens.Signup} />,
  <Stack.Screen name="Privacy" component={Screens.PrivacyPolicy} />,

]
