import React from "react";
import { Icon, Input } from "@ui-kitten/components";
import { StyleSheet, View, Image } from "react-native";

import logo512 from "../logo/logo512.png";
import { useNavigation } from "@react-navigation/core";
import * as Icons from "../icons/Icons";

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

export type ModeType = "search" | "home";

interface ITopBar {
  mode: ModeType;
}

const TopBar = ({ mode }: ITopBar) => {
  const navigation = useNavigation();
  return (
    <View style={styles.topNavigation}>
      {mode === "home" ? (
        <Image source={logo512} style={styles.logo} />
      ) : (
        <Icons.Back style={{ width: 32, height: 32 }} fill="black" />
      )}

      <Input
        placeholder="Search Recipe"
        size="large"
        style={styles.search}
        accessoryLeft={(props) => (
          <Icon style={styles.icon} name="search" {...props} />
        )}
        onBlur={() => navigation.navigate("RecipeSearch")}
      />
    </View>
  );
};

export default TopBar;
