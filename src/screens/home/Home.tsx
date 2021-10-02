import React, { useState } from 'react';
import { TopBar } from '@greeneggs/core';
import HomeTabs from './home-tabs/HomeTabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';


const Home = () => { 
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState<string | undefined>();

  return (
    <>
      <View style={{ paddingTop: insets.top }}>
        <TopBar query={query} setQuery={setQuery} />
      </View>
      { query === undefined ? (
        <HomeTabs/>
      ): <Text>You are typing</Text>}
    </>
  )
};

export default Home;
