import { useNavigation } from "@react-navigation/native";
import {
  Button,
  TopNavigation,
  TopNavigationAction,
  TopNavigationProps,
} from "@ui-kitten/components";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image, StyleSheet } from "react-native";

import logo512 from "../logo/logo512.png";
import * as Icons from "../icons/Icons";
import TopBar from "./TopBar";

export type TopBarModes = "RecipeSearch" | "Home";

interface ITopBarTemplate {
  mode: TopBarModes;
}

const styles = StyleSheet.create({
  logo: {
    width: 48,
    height: 48,
    marginRight: 16,
  },
});

const TopBarTemplate = ({ mode }: ITopBarTemplate) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const modeMap: Record<TopBarModes, TopNavigationProps> = {
    RecipeSearch: {
      accessoryLeft: () => (
        <TopNavigationAction
          icon={Icons.Back}
          onPress={() => navigation.goBack()}
        />
      ),
      accessoryRight: () => (
        <>
          <TopBar
            inputProps={{ autoFocus: true }}
            accessoryRight={
              <Button
                status="basic"
                accessoryLeft={(props) => (
                  <Icons.Options {...props} fill="green" />
                )}
              />
            }
          />
        </>
      ),
    },
    Home: {
      accessoryRight: () => (
        <TopBar
          inputProps={{ onFocus: () => navigation.navigate("RecipeSearch") }}
          accessoryLeft={<Image source={logo512} style={styles.logo} />}
        />
      ),
    },
  };

  return (
    <TopNavigation
      style={{ backgroundColor: "transparent", marginTop: insets.top }}
      {...modeMap[mode]}
    />
  );
};

export default TopBarTemplate;
