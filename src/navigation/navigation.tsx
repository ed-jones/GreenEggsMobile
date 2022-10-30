/**
 * Author: Edward Jones
 */
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { NotFoundScreen, AddRecipe, Home, MyProfile, SavedRecipes, Notifications } from '../screens'
import { BottomTabBar } from './bottom-tab-bar'

const { Navigator, Screen } = createBottomTabNavigator()

export type BottomTabRouteParams = {
  [key in NavigationRoute]: undefined
}

export type NavigationRoute = typeof routes[number]['name']

const routes = [
  { name: 'Home', component: Home },
  { name: 'SavedRecipes', component: SavedRecipes },
  { name: 'AddRecipe', component: AddRecipe },
  { name: 'Notifications', component: Notifications },
  { name: 'MyProfile', component: MyProfile },
  { name: 'NotFound', component: NotFoundScreen },
]

/**
 * Navigation logic for the bottom tab bar
 */
export function Navigation() {
  return (
    <Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <BottomTabBar {...props} />}>
      {routes.map(({ name, component }) => (
        <Screen key={name} name={name} component={component} />
      ))}
    </Navigator>
  )
}
