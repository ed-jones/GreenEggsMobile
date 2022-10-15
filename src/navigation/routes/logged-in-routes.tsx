/**
 * Author: Edward Jones
 */
import React from 'react'
import { Stack } from '../stack'
import * as Screens from '../../screens'
import { Navigation } from '@greeneggs/navigation'

/**
 * Array containing a list of all screens accessible to logged in users.
 */
export const LoggedInRoutes = [
  <Stack.Screen name='Home' component={Navigation} key='Home' />,
  <Stack.Screen name='Recipe' component={Screens.Recipe} key='Recipe' />,
  <Stack.Screen name='RecipeDescription' component={Screens.RecipeDescription} key='RecipeDescription' />,
  <Stack.Screen name='CreateStep' component={Screens.CreateStep} key='CreateStep' />,
  <Stack.Screen name='CreateDiet' component={Screens.CreateDiet} key='CreateDiet' />,
  <Stack.Screen name='CreateAllergy' component={Screens.CreateAllergy} key='CreateAllergy' />,
  <Stack.Screen name='Settings' component={Screens.Settings} key='Settings' />,
  <Stack.Screen name='EditProfile' component={Screens.EditProfile} key='EditProfile' />,
  <Stack.Screen name='EditProfilePicture' component={Screens.EditProfilePicture} key='EditProfilePicture' />,
  <Stack.Screen name='ChangePassword' component={Screens.ChangePassword} key='ChangePassword' />,
  <Stack.Screen name='DeleteAccount' component={Screens.DeleteAccount} key='DeleteAccount' />,
  <Stack.Screen name='Diets' component={Screens.DietaryPreferences} key='Diets' />,
  <Stack.Screen name='Allergies' component={Screens.AllergyPreferences} key='Allergies' />,
  <Stack.Screen name='ProfileVisibility' component={Screens.ProfileVisibility} key='ProfileVisibility' />,
  <Stack.Screen name='RecipeAllComments' component={Screens.RecipeAllComments} key='RecipeAllComments' />,
  <Stack.Screen name='RecipeCommentReplies' component={Screens.RecipeCommentReplies} key='RecipeCommentReplies' />,
  <Stack.Screen name='RecipeAllIngredients' component={Screens.RecipeAllIngredients} key='RecipeAllIngredients' />,
  <Stack.Screen
    name='RecipeDirectionExpanded'
    component={Screens.RecipeDirectionExpanded}
    key='RecipeDirectionExpanded'
  />,
  <Stack.Screen name='SavedRecipes' component={Screens.SavedRecipes} key='SavedRecipes' />,
  <Stack.Screen name='Profile' component={Screens.Profile} key='Profile' />,
  <Stack.Screen name='RecipeSearchFilter' component={Screens.RecipeSearchFilter} key='RecipeSearchFilter' />,
  <Stack.Screen
    name='FilterIngredientsIncluded'
    component={Screens.FilterIngredientsIncluded}
    key='FilterIngredientsIncluded'
  />,
  <Stack.Screen
    name='FilterIngredientsExcluded'
    component={Screens.FilterIngredientsExcluded}
    key='FilterIngredientsExcluded'
  />,
  <Stack.Screen
    name='FilterRecipeCategories'
    component={Screens.FilterRecipeCategories}
    key='FilterRecipeCategories'
  />,
  <Stack.Screen name='FilterRecipeAllergies' component={Screens.FilterRecipeAllergies} key='FilterRecipeAllergies' />,
  <Stack.Screen name='FilterRecipeDiets' component={Screens.FilterRecipeDiets} key='FilterRecipeDiets' />,
  <Stack.Screen name='FilterRecipeCookTime' component={Screens.FilterRecipeCookTime} key='FilterRecipeCookTime' />,
  <Stack.Screen name='Following' component={Screens.Following} key='Following' />,
  <Stack.Screen name='Followers' component={Screens.Followers} key='Followers' />,
  <Stack.Screen name='Category' component={Screens.Category} key='Category' />,
  <Stack.Screen name='AllCategories' component={Screens.AllCategories} key='AllCategories' />,
  <Stack.Screen name='PickCategory' component={Screens.PickCategory} key='PickCategory' />,
  <Stack.Screen name='PickIngredient' component={Screens.PickIngredient} key='PickIngredient' />,
  <Stack.Screen name='AddIngredientDetails' component={Screens.AddIngredientDetails} key='AddIngredientDetails' />,
]
