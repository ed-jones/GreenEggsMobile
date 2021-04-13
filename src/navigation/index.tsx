import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ImageProps } from 'react-native';
import { BottomTabBarOptions, BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';

import LinkingConfiguration from './LinkingConfiguration';
import { NotFoundScreen, Recipes, TabTwoScreen } from '../screens';

const { Navigator, Screen } = createBottomTabNavigator();

const RecipeGalleryIcon = (props?: Partial<ImageProps>) => <Icon {...props} name='home-outline' />;
const AddRecipeIcon = (props?: Partial<ImageProps>) => <Icon {...props} name='plus-circle-outline' />;

const BottomTabBar = ({ navigation, state }: BottomTabBarProps<BottomTabBarOptions>) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title='Home' icon={RecipeGalleryIcon} />
    <BottomNavigationTab title='Add Recipe' icon={AddRecipeIcon} />
  </BottomNavigation>
);

function RootNavigator() {
  return (
    <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Screen name="Root" component={Recipes} />
      <Screen name="TabTwo" component={TabTwoScreen} />
      <Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Navigator>
  );
}

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation() {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}
