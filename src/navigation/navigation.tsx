import React, { FC, ReactElement, ReactNode } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  NotFoundScreen,
  AddRecipe,
  Home,
  MyProfile,
  SavedRecipes,
  Notifications,
} from "../screens";
import { BottomTabBar} from "./bottom-tab-bar";

const { Navigator, Screen } = createBottomTabNavigator();

export function Navigation() {
  return (
    <Navigator 
    tabBar={(props) => <BottomTabBar {...props} />} 
    >
      <Screen name="Home" component={Home} />
      <Screen
        name="SavedRecipes"
        component={SavedRecipes}
        options={{ title: "Oops!" }}
      />
      <Screen name="AddRecipe" component={AddRecipe} />
      <Screen
        name="Notifications"
        component={Notifications}
        options={{ title: "Oops!" }}
      />
      <Screen name="MyProfile" component={MyProfile} />
      <Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Navigator>
  );
}
