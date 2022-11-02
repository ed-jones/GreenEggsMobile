/**
 * Author: Edward Jones
 */
import React from 'react'
import { Stack } from '../stack'
import * as Screens from '../../screens'
import { Navigation } from '@greeneggs/navigation'
import {
  recipe_recipe_data_comments,
  recipe_recipe_data_ingredients,
  recipe_recipe_data_steps,
  Users_users_data,
} from '@greeneggs/types/graphql'
import { StackNavigationProp } from '@react-navigation/stack'

export type LoggedInRoute = typeof loggedInRoutesArray[number]

export type LoggedInNavigationProp = StackNavigationProp<LoggedInRouteParams>

type LoggedInRouteParamsOverride = {
  RecipeDescription: {
    description: string
    createdAt: string
    title: string
    submittedBy: Users_users_data
  }
  RecipeAllComments: {
    comments: recipe_recipe_data_comments[]
    commentCount: number
    recipeId: string
    isReply: boolean
  }
  RecipeCommentReplies: {
    commentId: string | null
    replying: boolean
  }
  RecipeAllIngredients: {
    ingredients: recipe_recipe_data_ingredients[]
    multiplier: number
  }
  RecipeDirectionExpanded: {
    direction: recipe_recipe_data_steps
  }
  AddIngredientDetails: {
    name: string
  }
  Category: {
    categoryName: string
    categoryId: string
  }
  Recipe: {
    recipeId: string | null
  }
  Followers: {
    userId: string
  }
  Following: {
    userId: string
  }
  Profile: {
    userId: string
  }
  Comment: {
    commentId: string | null
  }
  MyProfile: {
    index: number
  }
}

export type LoggedInRouteParams = Omit<
  {
    [key in LoggedInRoute]: undefined
  },
  keyof LoggedInRouteParamsOverride
> &
  LoggedInRouteParamsOverride

const routes = [
  { name: 'Navigation', component: Navigation },
  { name: 'Recipe', component: Screens.Recipe },
  { name: 'RecipeDescription', component: Screens.RecipeDescription },
  { name: 'CreateStep', component: Screens.CreateStep },
  { name: 'CreateDiet', component: Screens.CreateDiet },
  { name: 'CreateAllergy', component: Screens.CreateAllergy },
  { name: 'Settings', component: Screens.Settings },
  { name: 'EditProfile', component: Screens.EditProfile },
  { name: 'EditProfilePicture', component: Screens.EditProfilePicture },
  { name: 'ChangePassword', component: Screens.ChangePassword },
  { name: 'DeleteAccount', component: Screens.DeleteAccount },
  { name: 'Diets', component: Screens.DietaryPreferences },
  { name: 'Allergies', component: Screens.AllergyPreferences },
  { name: 'ProfileVisibility', component: Screens.ProfileVisibility },
  { name: 'RecipeAllComments', component: Screens.RecipeAllComments },
  { name: 'RecipeCommentReplies', component: Screens.RecipeCommentReplies },
  { name: 'RecipeAllIngredients', component: Screens.RecipeAllIngredients },
  { name: 'RecipeDirectionExpanded', component: Screens.RecipeDirectionExpanded },
  { name: 'SavedRecipes', component: Screens.SavedRecipes },
  { name: 'Profile', component: Screens.Profile },
  { name: 'RecipeSearchFilter', component: Screens.RecipeSearchFilter },
  { name: 'FilterIngredientsIncluded', component: Screens.FilterIngredientsIncluded },
  { name: 'FilterIngredientsExcluded', component: Screens.FilterIngredientsExcluded },
  { name: 'FilterRecipeCategories', component: Screens.FilterRecipeCategories },
  { name: 'FilterRecipeAllergies', component: Screens.FilterRecipeAllergies },
  { name: 'FilterRecipeDiets', component: Screens.FilterRecipeDiets },
  { name: 'FilterRecipeCookTime', component: Screens.FilterRecipeCookTime },
  { name: 'Following', component: Screens.Following },
  { name: 'Followers', component: Screens.Followers },
  { name: 'Category', component: Screens.Category },
  { name: 'AllCategories', component: Screens.AllCategories },
  { name: 'PickCategory', component: Screens.PickCategory },
  { name: 'PickIngredient', component: Screens.PickIngredient },
  { name: 'AddIngredientDetails', component: Screens.AddIngredientDetails },
] as const

export const loggedInRoutesArray = [...routes.map((route) => route.name)] as const

/**
 * Array containing a list of all screens accessible to logged in users.
 */
export const loggedInRoutes = routes.map(({ name, component }) => (
  <Stack.Screen key={name} name={name} component={component} />
))
