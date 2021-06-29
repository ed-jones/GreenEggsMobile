import React from 'react';
import { TopBar } from '@greeneggs/core';
import HomeTabs from './home-tabs/HomeTabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';


const Home = () => { 
  const insets = useSafeAreaInsets();

  return (
    <>
      <View style={{ paddingTop: insets.top }}>
        <TopBar />
      </View>
      <HomeTabs/>
    </>
  )
};

export default Home;
