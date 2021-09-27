import React, { Key, useContext } from "react";
import {
  List,
  Text,
  TopNavigation,
  TopNavigationAction,
  ListItem,
  Icon,
  Divider,
  withStyles,
  ThemedComponentProps,
} from "@ui-kitten/components";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { Icons } from "@greeneggs/core";
import Svg, { Circle } from "react-native-svg";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "@greeneggs/core/auth-context/AuthContext";

const styles = StyleSheet.create({});

const Following = withStyles(
  ({
    navigation,
    eva,
  }: { navigation: StackNavigationProp<any> } & ThemedComponentProps) => {
    const insets = useSafeAreaInsets();
    const { setToken } = useContext(AuthContext);

    const navigateBack = () => {
      navigation.navigate("Home");
    };

    return (
      <>
        <TopNavigation
          title="Following"
          alignment="center"
          style={{ backgroundColor: "transparent", marginTop: insets.top }}
          accessoryLeft={() => (
            <TopNavigationAction icon={Icons.Back} onPress={navigateBack} />
          )}
        />
      </>
    );
  }
);

export default Following;
