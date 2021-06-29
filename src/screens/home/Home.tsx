import React from 'react';
import { TopBar } from '@greeneggs/core';
import HomeTabs from './home-tabs/HomeTabs';

const Home = ({ navigation }: any) => (
  <>
    <TopBar />
    <HomeTabs navigation={navigation}/>
  </>
);

export default Home;
