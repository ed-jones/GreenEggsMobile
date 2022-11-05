/**
 * Author: Edward Jones
 */
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { BottomTabBar } from './bottom-tab-bar'
import { AddRecipe } from '@greeneggs/screens/add-recipe/add-recipe'
import { Home } from '@greeneggs/screens/home/home'
import { NotFoundScreen } from '@greeneggs/screens/not-found-screen'
import { Notifications } from '@greeneggs/screens/notifications'
import { MyProfile } from '@greeneggs/screens/profile/my-profile'
import { SavedRecipes } from '@greeneggs/screens/saved-recipes'

// eslint-disable-next-line @typescript-eslint/naming-convention
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
