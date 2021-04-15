import React from 'react';
import { BottomTabBarOptions, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  primary: {
    height: 64,
    width: 64,
  },
  secondary: {
    height: 32,
    width: 32,
  },
  navbar: {
    paddingVertical: 8,
  }
});

enum IconStyle {
  Primary = 'primary',
  Secondary = 'secondary',
}

const BottomNavigationIcon = ({name, iconStyle}: { name: string, iconStyle: IconStyle }) => (
  <Icon style={styles[iconStyle]} name={name} fill='#A36F3F' />
)

const BottomTabBar = ({ navigation, state }: BottomTabBarProps<BottomTabBarOptions>) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
    appearance='noIndicator'
    style={styles.navbar}
  >
    <BottomNavigationTab icon={() => <BottomNavigationIcon name='home-outline' iconStyle={IconStyle.Secondary}/>} />
    <BottomNavigationTab icon={() => <BottomNavigationIcon name='bell-outline' iconStyle={IconStyle.Secondary}/>} />
    <BottomNavigationTab icon={() => <BottomNavigationIcon name='plus-circle-outline' iconStyle={IconStyle.Primary}/>} />
    <BottomNavigationTab icon={() => <BottomNavigationIcon name='bookmark-outline' iconStyle={IconStyle.Secondary}/>} />
    <BottomNavigationTab icon={() => <BottomNavigationIcon name='person-outline' iconStyle={IconStyle.Secondary}/>} />
  </BottomNavigation>
);

export default BottomTabBar;
