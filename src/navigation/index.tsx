import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NotFoundScreen, Recipes, AddRecipe } from '../screens';
import BottomTabBar from './BottomTabBar';

const { Navigator, Screen } = createBottomTabNavigator();


// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation() {
  return (
    <NavigationContainer>
      <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
        <Screen name="Home" component={Recipes}/>
        <Screen name="AddRecipe" component={AddRecipe} />
        <Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      </Navigator>
    </NavigationContainer>
  );
}
