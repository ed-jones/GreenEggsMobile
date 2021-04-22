import React from 'react';
import AllRecipes from '../all-recipes/AllRecipes';
import useTabIndex from './useTabIndex';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { TabBar, Tab, } from '@ui-kitten/components';

const { Navigator, Screen } = createMaterialTopTabNavigator();

const TopTabBar = ({ navigation, state }: MaterialTopTabBarProps) => (
  <TabBar
    indicatorStyle={{backgroundColor: '#A36F3F', height: 2}}
    style={{backgroundColor: 'transparent', margin: 8}}
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <Tab title='NEWS FEED'/>
    <Tab title='TRENDING'/>
    <Tab title='CATEGORIES'/>
    <Tab title='MY RECIPES'/>
  </TabBar>
);

export const HomeTabs = () => (
  <NavigationContainer independent>
    <Navigator tabBar={(props: MaterialTopTabBarProps) => <TopTabBar {...props} />}>
      <Screen name='NEWS FEED' component={AllRecipes}/>
      <Screen name='TRENDING' component={AllRecipes}/>
      <Screen name='CATEGORIES' component={AllRecipes}/>
      <Screen name='MY RECIPES' component={AllRecipes}/>
    </Navigator>
  </NavigationContainer>
);

export default HomeTabs;
