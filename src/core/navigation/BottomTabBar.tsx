import React from "react";
import { StyleSheet, View } from "react-native";
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
import Svg, { Circle } from "react-native-svg";

const styles = StyleSheet.create({
  primary: {
    height: 48,
    width: 48,
    marginLeft: 8,
    marginTop: 8,
  },
  secondary: {
    height: 32,
    width: 32,
  },
  navbar: {
    paddingBottom: 24,
    paddingTop: 12,
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

const BottomTabBar = withStyles(
  ({
    navigation,
    state,
    eva,
  }: BottomTabBarProps<BottomTabBarOptions> & ThemedComponentProps) => (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
      appearance="noIndicator"
      style={styles.navbar}
    >
      <BottomNavigationTab
        icon={(props) => (
          <BottomNavigationIcon
            {...props}
            name="home-outline"
            iconStyle={IconStyle.Secondary}
          />
        )}
      />
      <BottomNavigationTab
        icon={(props) => (
          <BottomNavigationIcon
            {...props}
            name="bookmark-outline"
            iconStyle={IconStyle.Secondary}
          />
        )}
      />
      <BottomNavigationTab
        icon={(props) => (
          <View style={{ marginTop: -16 }}>
            <Svg
              height="72"
              width="72"
              style={{
                position: "absolute",
                marginLeft: -4,
                marginTop: -4,
              }}
            >
              <Circle
                cx="36"
                cy="36"
                r="36"
                fill={eva?.theme && eva.theme["color-success-500"]}
              />
            </Svg>
            <Icon
              {...props}
              name="plus-outline"
              style={styles.primary}
              fill={eva?.theme && eva.theme["color-primary-500"]}
            />
          </View>
        )}
      />
      <BottomNavigationTab
        icon={(props) => (
          <BottomNavigationIcon
            {...props}
            name="bell-outline"
            iconStyle={IconStyle.Secondary}
          />
        )}
      />
      <BottomNavigationTab
        icon={(props) => (
          <BottomNavigationIcon
            {...props}
            name="person-outline"
            iconStyle={IconStyle.Secondary}
          />
        )}
      />
    </BottomNavigation>
  )
);

export default BottomTabBar;
