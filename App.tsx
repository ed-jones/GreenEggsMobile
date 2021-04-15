import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { StatusBar } from 'react-native';

import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';

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
        <ApplicationProvider {...eva} theme={eva.light}>
          <SafeAreaProvider>
            <Navigation />
          </SafeAreaProvider>
        </ApplicationProvider>
      </ApolloProvider>
    );
  }
}
