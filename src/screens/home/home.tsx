import React, { useContext, useState } from 'react';
import { TopBar, Background } from '@greeneggs/core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { SearchContext } from '@greeneggs/providers/search-state-provider';

import HomeTabs from './home-tabs';
import RecipeSearch from '../search/recipe-search';

const Home = () => { 
  const insets = useSafeAreaInsets();
  const {searchState} = useContext(SearchContext)

  return (
    <Background>
      <View style={{ paddingTop: insets.top }}>
        <TopBar />
      </View>
      { searchState.query === undefined ? (
        <HomeTabs/>
      ): <RecipeSearch />}
    </Background>
  )
};

export default Home;
