import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { TabBar, Tab } from '@ui-kitten/components';
import AllRecipes from '../all-recipes/AllRecipes';
import { createStackNavigator } from '@react-navigation/stack';
import Recipe from '@greeneggs/screens/recipe/Recipe';

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

const Stack = createStackNavigator();

export default function HomeTabs({ navigation }: any) {
  return (
    <NavigationContainer independent>
      <Navigator
        tabBar={(props: MaterialTopTabBarProps) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <TopTabBar {...props} />
        )}
      >
        <Screen name="NEWS FEED" component={() => <AllRecipes navigation={navigation} />}/>
        <Screen name="TRENDING" component={AllRecipes} />
        <Screen name="CATEGORIES" component={AllRecipes} />
        <Screen name="MY RECIPES" component={AllRecipes} />
      </Navigator>
    </NavigationContainer>
  );
}
