import React from "react";
import { StyleSheet } from "react-native";
import {
  BottomTabBarOptions,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  ThemedComponentProps,
  withStyles,
} from "@ui-kitten/components";

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
  },
});

enum IconStyle {
  Primary = "primary",
  Secondary = "secondary",
}

const BottomNavigationIcon = withStyles(
  ({
    name,
    iconStyle,
    eva,
  }: { name: string; iconStyle: IconStyle } & ThemedComponentProps) => (
    <Icon
      style={styles[iconStyle]}
      name={name}
      fill={
        iconStyle === IconStyle.Primary
          ? eva?.theme && eva.theme["color-primary-500"]
          : eva?.theme && eva.theme["text-primary-color"]
      }
    />
  )
);

const BottomTabBar = ({
  navigation,
  state,
}: BottomTabBarProps<BottomTabBarOptions>) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
    appearance="noIndicator"
    style={styles.navbar}
  >
    <BottomNavigationTab
      icon={() => (
        <BottomNavigationIcon
          name="home-outline"
          iconStyle={IconStyle.Secondary}
        />
      )}
    />
    <BottomNavigationTab
      icon={() => (
        <BottomNavigationIcon
          name="bell-outline"
          iconStyle={IconStyle.Secondary}
        />
      )}
    />
    <BottomNavigationTab
      icon={() => (
        <BottomNavigationIcon
          name="plus-circle-outline"
          iconStyle={IconStyle.Primary}
        />
      )}
    />
    <BottomNavigationTab
      icon={() => (
        <BottomNavigationIcon
          name="bookmark-outline"
          iconStyle={IconStyle.Secondary}
        />
      )}
    />
    <BottomNavigationTab
      icon={() => (
        <BottomNavigationIcon
          name="person-outline"
          iconStyle={IconStyle.Secondary}
        />
      )}
    />
  </BottomNavigation>
);

export default BottomTabBar;
