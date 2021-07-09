import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NotFoundScreen, AddRecipe, Home, Profile } from '../../screens';
import BottomTabBar from './BottomTabBar';
import Settings from '@greeneggs/screens/settings/Settings';

const { Navigator, Screen } = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Screen name="Home" component={Home} />
      <Screen name="Notifications" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Screen name="AddRecipe" component={AddRecipe} />
      <Screen name="Bookmarks" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Screen name="Profile" component={Settings} options={{ title: 'Oops!' }} />
      <Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Navigator>
  );
}
