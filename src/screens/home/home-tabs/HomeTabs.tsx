import React from 'react';
import { Layout, Tab, TabView, Text } from '@ui-kitten/components';
import AllRecipes from '../all-recipes/AllRecipes';
import useTabIndex from './useTabIndex';

const HomeTabs = () => {
  const tabIndex = useTabIndex();

  return (
    <TabView
      {...tabIndex}
      indicatorStyle={{backgroundColor: '#A36F3F', height: 2}}
      tabBarStyle={{backgroundColor: 'transparent', margin: 8}}
    >
      <Tab title='NEWS FEED'>
        <AllRecipes/>
      </Tab>
      <Tab title='TRENDING'>
        <AllRecipes/>
      </Tab>
      <Tab title='CATEGORIES'>
        <AllRecipes/>
      </Tab>
      <Tab title='MY RECIPES'>
        <AllRecipes/>
      </Tab>
    </TabView>
  );
};

export default HomeTabs;
