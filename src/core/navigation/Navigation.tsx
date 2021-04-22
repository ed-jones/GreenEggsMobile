import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NotFoundScreen, AddRecipe } from '../../screens';
import { RecipeTabs } from '..';
import BottomTabBar from './BottomTabBar';

const { Navigator, Screen } = createBottomTabNavigator();

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation() {
  return (
    <NavigationContainer>
      <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
        <Screen name="Home" component={RecipeTabs}/>
        <Screen name="Notifications" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        <Screen name="AddRecipe" component={AddRecipe} />
        <Screen name="Bookmarks" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        <Screen name="Profile" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        <Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      </Navigator>
    </NavigationContainer>
  );
}
