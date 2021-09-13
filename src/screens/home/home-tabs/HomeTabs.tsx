import React from 'react';
import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { TabBar, Tab } from '@ui-kitten/components';
import AllRecipes from '../all-recipes/AllRecipes';
import NewsFeed from '../news-feed/NewsFeed';
import Trending from '../trending/Trending';

const { Navigator, Screen } = createMaterialTopTabNavigator();

const TopTabBar = ({ navigation, state }: MaterialTopTabBarProps) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <Tab title="NEWS FEED" />
    <Tab title="TRENDING" />
    <Tab title="CATEGORIES" />
  </TabBar>
);

export default function HomeTabs() {
  return (
    <Navigator
      tabBar={(props: MaterialTopTabBarProps) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <TopTabBar {...props} />
      )}
    >
      <Screen name="NEWS FEED" component={NewsFeed} />
      <Screen name="TRENDING" component={Trending} />
      <Screen name="CATEGORIES" component={AllRecipes} />
    </Navigator>
  );
}
