import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import useCachedResources from './src/core/use-cached-resources/useCachedResources';
import Welcome from './src/screens/auth/Welcome';
import Login from './src/screens/auth/Login';
import Signup from './src/screens/auth/Signup';
import Home from './src/screens/home/Home';
import Theme from './src/theme/theme.json';
import Mapping from './src/theme/mapping.json';

const client = new ApolloClient({
  uri: process.env.API_URI,
  cache: new InMemoryCache(),
});

setContext((_request, _previousContext) => ({
  headers: { 
    authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA3Zjc5YTdkLTYyMzMtNGZhMy1iM2UxLWI0MjU1NGFkMDc0NiIsImZpcnN0TmFtZSI6IkpvaG4iLCJsYXN0TmFtZSI6IlNtaXRoIiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkQ25jOU9hMXdaR2hWeHV4WC9pdVZidWlXNlVEREI4d091NkhOcXlSNjJwZXAxUC9IYzYwTVMiLCJhdmF0YXJVUkkiOm51bGwsInZlcmlmaWVkIjpmYWxzZSwiaWF0IjoxNjIzODM2NDMxfQ.IQSAEXZeIFGivWQPVhVv55E4yZlibYSh_dfjR6_2jKk'
  },
}));

const Stack = createStackNavigator();

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <ApolloProvider client={client}>
      <IconRegistry icons={EvaIconsPack} />
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.light, ...Theme }}
        customMapping={Mapping}
      >
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator headerMode='none'>
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </ApplicationProvider>
    </ApolloProvider>
  );
}
