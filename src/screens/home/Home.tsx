import React, { useContext, useState } from 'react';
import { TopBar } from '@greeneggs/core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { SearchContext } from '@greeneggs/providers/SearchStateProvider';

import HomeTabs from './home-tabs/HomeTabs';
import RecipeSearch from '../search/RecipeSearch';
import Background from '@greeneggs/core/background';

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
