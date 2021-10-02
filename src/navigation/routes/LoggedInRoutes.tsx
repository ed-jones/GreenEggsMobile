import React from 'react';
import Stack from '../Stack';
import * as Screens from "../../screens";
import { Navigation } from "@greeneggs/navigation";

const LoggedInRoutes = [
  <Stack.Screen name="Home" component={Navigation} />,
  <Stack.Screen name="Recipe" component={Screens.Recipe} />,
  <Stack.Screen
    name="RecipeDescription"
    component={Screens.RecipeDescription}
  />,
  <Stack.Screen
    name="CreateIngredient"
    component={Screens.CreateIngredient}
  />,
  <Stack.Screen
    name="CreateStep"
    component={Screens.CreateStep}
  />,
  <Stack.Screen
    name="CreateCategory"
    component={Screens.CreateCategory}
  />,
  <Stack.Screen
    name="CreateDiet"
    component={Screens.CreateDiet}
  />,
  <Stack.Screen
    name="CreateAllergy"
    component={Screens.CreateAllergy}
  />,
  <Stack.Screen name="Settings" component={Screens.Settings} />,
  <Stack.Screen
    name="EditProfile"
    component={Screens.EditProfile}
  />,
  <Stack.Screen
    name="EditProfilePicture"
    component={Screens.EditProfilePicture}
  />,
  <Stack.Screen
    name="ChangePassword"
    component={Screens.ChangePassword}
  />,
  <Stack.Screen
    name="ConnectAccounts"
    component={Screens.ConnectAccounts}
  />,
  <Stack.Screen name="SignOut" component={Screens.SignOut} />,
  <Stack.Screen
    name="DeleteAccount"
    component={Screens.DeleteAccount}
  />,
  <Stack.Screen
    name="Diets"
    component={Screens.DietaryPreferences}
  />,
  <Stack.Screen
    name="Allergies"
    component={Screens.AllergyPreferences}
  />,
  <Stack.Screen
    name="ProfileVisibility"
    component={Screens.ProfileVisibility}
  />,
  <Stack.Screen
    name="RecipeAllComments"
    component={Screens.RecipeAllComments}
  />,
  <Stack.Screen
    name="RecipeCommentReplies"
    component={Screens.RecipeCommentReplies}
  />,
  <Stack.Screen
    name="RecipeAllIngredients"
    component={Screens.RecipeAllIngredients}
  />,
  <Stack.Screen
    name="RecipeDirectionExpanded"
    component={Screens.RecipeDirectionExpanded}
  />,
  <Stack.Screen
    name="SavedRecipes"
    component={Screens.SavedRecipes}
  />,
  <Stack.Screen name="Profile" component={Screens.Profile} />,
  <Stack.Screen name="RecipeSearchFilter" component={Screens.RecipeSearchFilter} />,
  <Stack.Screen name="FilterIngredientsIncluded" component={Screens.FilterIngredientsIncluded} />,
 ]

export default LoggedInRoutes;
