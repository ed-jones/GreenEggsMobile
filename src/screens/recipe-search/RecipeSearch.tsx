import React from "react";
import {
  Text,
  Button,
  withStyles,
  ThemedComponentProps,
  TopNavigation,
  Layout,
  TopNavigationAction,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { Icons, TopBar } from "@greeneggs/core";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const RecipeSearch = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <>
      <TopNavigation
        accessoryRight={() => (
          <TopBar
            accessoryRight={
              <Button
                status="basic"
                accessoryLeft={(props) => <Icons.Filter {...props} />}
              />
            }
          />
        )}
        style={{ backgroundColor: "transparent", marginTop: insets.top }}
        accessoryLeft={() => (
          <TopNavigationAction
            icon={Icons.Back}
            onPress={() => navigation.goBack()}
          />
        )}
      />
      <Text>Hello World!</Text>
    </>
  );
};

export default RecipeSearch;
