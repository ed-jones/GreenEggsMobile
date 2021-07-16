import React from "react";
import HomeTabs from "./home-tabs/HomeTabs";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import TopBarTemplate, {
  TopBarModes,
} from "@greeneggs/core/top-bar/TopBarTemplate";
import RecipeSearch from "../recipe-search/RecipeSearch";

const { Screen, Navigator } = createStackNavigator();

const Home = ({}) => {
  return (
    <>
      <Navigator
        headerMode="float"
        screenOptions={{
          header: ({ navigation, scene }) => {
            const { routes, index } = navigation.dangerouslyGetState();
            const {
              route: { name: routeName },
            } = scene;

            if (routes[index].name !== routeName) {
              return null;
            }
            return <TopBarTemplate mode={routeName as TopBarModes} />;
          },
        }}
      >
        <Screen name="Home" component={HomeTabs} />
        <Screen name="RecipeSearch" component={RecipeSearch} />
      </Navigator>
    </>
  );
};

export default Home;
