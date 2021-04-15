import React from 'react';
import { BottomTabBarOptions, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { ImageProps } from 'react-native';

const RecipeGalleryIcon = (props?: Partial<ImageProps>) => <Icon {...props} name='home-outline' />;
const AddRecipeIcon = (props?: Partial<ImageProps>) => <Icon {...props} name='plus-circle-outline' />;


const BottomTabBar = ({ navigation, state }: BottomTabBarProps<BottomTabBarOptions>) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab icon={RecipeGalleryIcon} />
    <BottomNavigationTab icon={AddRecipeIcon} />
  </BottomNavigation>
);

export default BottomTabBar;
