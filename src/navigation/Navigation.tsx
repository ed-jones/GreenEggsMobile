import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  NotFoundScreen,
  AddRecipe,
  Home,
  Profile,
  SavedRecipes,
} from "../screens";
import BottomTabBar from "./BottomTabBar";

const { Navigator, Screen } = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Screen name="Home" component={Home} />
      <Screen
        name="SavedRecipes"
        component={SavedRecipes}
        options={{ title: "Oops!" }}
      />
      <Screen name="AddRecipe" component={AddRecipe} />
      <Screen
        name="Notifications"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Screen name="Profile" component={Profile} />
      <Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Navigator>
  );
}
