import React from 'react';
import Stack from '../Stack';
import * as Screens from "../../screens";

const LoggedOutRoutes = [
  <Stack.Screen name="Welcome" component={Screens.Welcome} />,
  <Stack.Screen name="Login" component={Screens.Login} />,
  <Stack.Screen name="Signup" component={Screens.Signup} />,
]

export default LoggedOutRoutes;
