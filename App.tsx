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

const client = new ApolloClient({
  uri: process.env.API_URI,
  cache: new InMemoryCache(),
});

setContext((_request, _previousContext) => ({
  headers: { 
    authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMwMWE4ZjNiLTMyYWQtNDQ3My04NTdjLTNmM2NmYmFjZTVhNSIsImZpcnN0TmFtZSI6IkpvaG4iLCJsYXN0TmFtZSI6IlNtaXRoIiwiZW1haWwiOiJoZWxsb0BleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFlIWkFOcFlLeDdUM2RBeUFIR1hzOE83UXhqLklmaDFTWVN3ZnVpcFNiTzRQQlBGbkhPTnpPIiwiYXZhdGFyVVJJIjpudWxsLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTYyMTI0MzY1OX0.LFtyu7P1pHPRe6Hlq1jcH4xcBzcv0gY4LFSa8l-yotk'
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
      <StatusBar backgroundColor="#FFECB4" barStyle="dark-content" />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...Theme }}>
        <SafeAreaProvider>
          <Welcome />
        </SafeAreaProvider>
      </ApplicationProvider>
    </ApolloProvider>
  );
}
