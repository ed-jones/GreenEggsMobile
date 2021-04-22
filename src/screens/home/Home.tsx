import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import TopBar from '../../core/top-bar/TopBar';
import HomeTabs from './home-tabs/HomeTabs';

const Home = () => (
  <SafeAreaView>
    <StatusBar backgroundColor='#FFECB4' barStyle='dark-content'/>
    <TopBar/>
    <HomeTabs/>
  </SafeAreaView>
);

export default Home;
