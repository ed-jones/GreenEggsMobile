import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import useCachedResources from './src/core/use-cached-resources/useCachedResources';
import Welcome from './src/core/navigation/Navigation';
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

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <ApolloProvider client={client}>
      <IconRegistry icons={EvaIconsPack} />
      <StatusBar backgroundColor="#F7F9FC" barStyle="dark-content" />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.light, ...Theme }}
        customMapping={Mapping}
      >
        <SafeAreaProvider>
          <Welcome />
        </SafeAreaProvider>
      </ApplicationProvider>
    </ApolloProvider>
  );
}
