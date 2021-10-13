import React, { FC } from "react";
import { Alert, StyleSheet, View } from "react-native";
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
  BottomNavigationTabProps,
} from "@ui-kitten/components";
import Svg, { Circle } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CountCircle } from "@greeneggs/screens/search/common";
import { useQuery } from "@apollo/client";
import { Queries } from "@greeneggs/graphql";
import { NotificationCount, notifications } from "@greeneggs/types/graphql";

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
    paddingTop: 12,
  },
});

enum IconStyle {
  Primary = "primary",
  Secondary = "secondary",
}

interface IBottonNavigationIcon {
  name: string;
  iconStyle: IconStyle;
  selected: boolean;
}

const BottomNavigationIcon = withStyles(
  ({
    name,
    iconStyle,
    eva,
    selected,
    ...rest
  }: IBottonNavigationIcon & ThemedComponentProps) => {
    const iconName = `${name}${!selected ? "-outline" : ""}`;
    if (iconStyle === IconStyle.Primary) {
      return (
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
              fill={
                selected
                  ? eva?.theme && eva.theme["color-primary-500"]
                  : eva?.theme && eva.theme["color-success-500"]
              }
            />
          </Svg>
          <Icon
            {...rest}
            name={iconName}
            style={styles.primary}
            fill={
              selected ? "white" : eva?.theme && eva.theme["color-primary-500"]
            }
          />
        </View>
      );
    } else {
      return (
        <Icon
          {...rest}
          style={styles[iconStyle]}
          name={iconName}
          fill={eva?.theme && eva.theme["text-primary-color"]}
        />
      );
    }
  }
);

interface NotificationIconProps extends BottomNavigationTabProps {
  selected: boolean;
}

const NotificationIcon = withStyles(
  ({
    selected,
    eva,
    ...props
  }: NotificationIconProps & ThemedComponentProps) => {
    const { data } = useQuery<NotificationCount>(
      Queries.GET_NOTIFICATION_COUNT, {
        pollInterval: 10000,
      }
    );
    console.log(data);
    const notificationCount =
      data?.notificationCount.data?.notificationCount ?? 0;

    return (
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        {notificationCount > 0 && (
          <Svg
            height="8"
            width="8"
            style={{
              position: "absolute",
              zIndex: 1,
              marginTop: -4,
            }}
          >
            <Circle
              cx="4"
              cy="4"
              r="4"
              fill={eva?.theme?.["color-primary-500"]}
            />
          </Svg>
        )}
        <BottomNavigationIcon
          {...props}
          name="bell"
          iconStyle={IconStyle.Secondary}
          selected={selected}
        />
      </View>
    );
  }
);

export const BottomTabBar = withStyles(
  ({
    navigation,
    state,
    eva,
  }: BottomTabBarProps<BottomTabBarOptions> & ThemedComponentProps) => {
    const insets = useSafeAreaInsets();
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const interceptNavigate = (index: number, navigate: () => void) => {
      if (index === selectedIndex) {
        return;
      }
      if (selectedIndex === 2) {
        Alert.alert(
          "Exit without saving?",
          "If you exit now you will lose your changes",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            { text: "OK", onPress: navigate },
          ],
          { cancelable: false }
        );
      } else {
        navigate();
      }
    };

    return (
      <BottomNavigation
        selectedIndex={state.index}
        onSelect={(index) => {
          interceptNavigate(index, () => {
            navigation.navigate(state.routeNames[index]);
            setSelectedIndex(index);
          });
        }}
        appearance="noIndicator"
        style={{ ...styles.navbar, paddingBottom: 24 + insets.bottom }}
      >
        <BottomNavigationTab
          icon={(props) => (
            <BottomNavigationIcon
              {...props}
              name="home"
              iconStyle={IconStyle.Secondary}
              selected={selectedIndex == 0}
            />
          )}
        />
        <BottomNavigationTab
          icon={(props) => (
            <BottomNavigationIcon
              {...props}
              name="bookmark"
              iconStyle={IconStyle.Secondary}
              selected={selectedIndex == 1}
            />
          )}
        />
        <BottomNavigationTab
          icon={(props) => (
            <BottomNavigationIcon
              {...props}
              name="plus"
              iconStyle={IconStyle.Primary}
              selected={selectedIndex == 2}
            />
          )}
        />
        <BottomNavigationTab
          icon={(props) => (
            <NotificationIcon {...props} selected={selectedIndex == 3} />
          )}
        />
        <BottomNavigationTab
          icon={(props) => (
            <BottomNavigationIcon
              {...props}
              name="person"
              iconStyle={IconStyle.Secondary}
              selected={selectedIndex == 4}
            />
          )}
        />
      </BottomNavigation>
    );
  }
);
