import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import useCachedResources from './src/core/use-cached-resources/useCachedResources';
import Navigation from './src/core/navigation/Navigation';
import Theme from './src/theme/theme.json';

const client = new ApolloClient({
  uri: process.env.API_URI,
  cache: new InMemoryCache()
});

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApolloProvider client={client}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{...eva.light, ...Theme}}>
          <SafeAreaProvider>
            <Navigation />
          </SafeAreaProvider>
        </ApplicationProvider>
      </ApolloProvider>
    );
  }
}
