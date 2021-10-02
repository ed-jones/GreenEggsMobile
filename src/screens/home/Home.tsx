import React, { useState } from 'react';
import { TopBar } from '@greeneggs/core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';

import HomeTabs from './home-tabs/HomeTabs';
import RecipeSearch from '../search/RecipeSearch';


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
      ): <RecipeSearch query={query} />}
    </>
  )
};

export default Home;
