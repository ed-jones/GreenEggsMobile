import React from 'react';
import { Tab, TabView, Text } from '@ui-kitten/components';
import { Recipes } from '../..';
import { SafeAreaView, StatusBar } from 'react-native';
import TopBar from '../../../core/top-bar/TopBar';

const RecipeTabs = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor='#FFECB4' barStyle='dark-content'/>
      <TopBar/>
      <TabView
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
        indicatorStyle={{backgroundColor: '#A36F3F', height: 2}}
        tabBarStyle={{backgroundColor: 'transparent', margin: 8}}
      >
        <Tab title='NEWS FEED'>
          <Recipes/>
        </Tab>
        <Tab title='TRENDING'>
          <Recipes/>
        </Tab>
        <Tab title='CATEGORIES'>
          <Recipes/>
        </Tab>
        <Tab title='MY RECIPES'>
          <Recipes/>
        </Tab>
      </TabView>
    </SafeAreaView>
  );
};

export default RecipeTabs;
