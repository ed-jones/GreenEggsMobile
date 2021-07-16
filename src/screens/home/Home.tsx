import React from "react";
import { Navigation, TopBar } from "@greeneggs/core";
import HomeTabs from "./home-tabs/HomeTabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import RecipeSearch from "../recipe-search/RecipeSearch";
import { template } from "@babel/core";
import { NavigationContainer } from "@react-navigation/native";
import { ModeType } from "@greeneggs/core/top-bar/TopBar";

const Stack = createStackNavigator();

interface ITopBarTemplate {
  children: React.ReactElement;
  mode: ModeType;
}

const TopBarTemplate = ({ children, mode }: ITopBarTemplate) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <View style={{ paddingTop: insets.top }}>
        <TopBar mode={mode} />
      </View>
      {children}
    </>
  );
};

const Home = () => (
  <NavigationContainer independent>
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="HomeTabs"
        component={() => (
          <TopBarTemplate mode="home">
            <HomeTabs />
          </TopBarTemplate>
        )}
      />
      <Stack.Screen
        name="RecipeSearch"
        component={() => (
          <TopBarTemplate mode="search">
            <RecipeSearch />
          </TopBarTemplate>
        )}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Home;
