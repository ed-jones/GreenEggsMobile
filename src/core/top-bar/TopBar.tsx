import React from "react";
import { Icon, Input, InputProps } from "@ui-kitten/components";
import { StyleSheet, View, Image } from "react-native";

import logo512 from "../logo/logo512.png";
import { useNavigation } from "@react-navigation/core";
import * as Icons from "../icons/Icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  topNavigation: {
    backgroundColor: "transparent",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
  logo: {
    width: 48,
    height: 48,
    marginRight: 16,
  },
  search: {
    marginRight: 16,
    flex: 1,
  },
});

interface ITopBar {
  inputProps?: InputProps;
  accessoryLeft?: React.ReactElement;
  accessoryRight?: React.ReactElement;
}

const TopBar = ({ inputProps, accessoryLeft, accessoryRight }: ITopBar) => {
  return (
    <View style={styles.topNavigation}>
      {accessoryLeft}
      <Input
        placeholder="Search Recipe"
        size="large"
        style={styles.search}
        accessoryLeft={(props) => (
          <Icon style={styles.icon} name="search" {...props} />
        )}
        {...inputProps}
      />
      {accessoryRight}
    </View>
  );
};

export default TopBar;
