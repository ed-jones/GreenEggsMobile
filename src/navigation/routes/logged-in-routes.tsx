/**
 * Author: Edward Jones
 */
import { ReactElement } from 'react'
import { Stack } from '../stack'

import { Navigation } from '../navigation'
import { Recipe } from '@greeneggs/screens/recipe/recipe'
import { CreateAllergy } from '@greeneggs/screens/add-recipe/add-recipe-allergies/create-allergy'
import { PickCategory } from '@greeneggs/screens/add-recipe/add-recipe-categories/pick-category'
import { CreateDiet } from '@greeneggs/screens/add-recipe/add-recipe-diets/create-diet'
import { CreateStep } from '@greeneggs/screens/add-recipe/add-recipe-directions/create-step'
import { AddIngredientDetails } from '@greeneggs/screens/add-recipe/add-recipe-ingredients/add-ingredient-details'
import { PickIngredient } from '@greeneggs/screens/add-recipe/add-recipe-ingredients/pick-ingredient'
import { AllCategories } from '@greeneggs/screens/home/all-categories'
import { Category } from '@greeneggs/screens/home/category'
import { Followers } from '@greeneggs/screens/profile/followers'
import { Following } from '@greeneggs/screens/profile/following'
import { Profile } from '@greeneggs/screens/profile/profile'
import { RecipeAllComments } from '@greeneggs/screens/recipe/recipe-all-comments'
import { RecipeAllIngredients } from '@greeneggs/screens/recipe/recipe-all-ingredients'
import { RecipeCommentReplies } from '@greeneggs/screens/recipe/recipe-comment-replies'
import { RecipeDescription } from '@greeneggs/screens/recipe/recipe-description'
import { RecipeDirectionExpanded } from '@greeneggs/screens/recipe/recipe-direction-expanded'
import { SavedRecipes } from '@greeneggs/screens/saved-recipes'
import { FilterIngredientsExcluded } from '@greeneggs/screens/search/filters/filter-ingredients-excluded'
import { FilterIngredientsIncluded } from '@greeneggs/screens/search/filters/filter-ingredients-included'
import { FilterRecipeAllergies } from '@greeneggs/screens/search/filters/filter-recipe-allergies'
import { FilterRecipeCategories } from '@greeneggs/screens/search/filters/filter-recipe-categories'
import { FilterRecipeCookTime } from '@greeneggs/screens/search/filters/filter-recipe-cook-time'
import { FilterRecipeDiets } from '@greeneggs/screens/search/filters/filter-recipe-diets'
import { RecipeSearchFilter } from '@greeneggs/screens/search/recipe-search-filter'
import { AllergyPreferences } from '@greeneggs/screens/settings/allergy-preferences'
import { ChangePassword } from '@greeneggs/screens/settings/change-password'
import { DeleteAccount } from '@greeneggs/screens/settings/delete-account'
import { DietaryPreferences } from '@greeneggs/screens/settings/dietary-preferences'
import { EditProfile } from '@greeneggs/screens/settings/edit-profile'
import { EditProfilePicture } from '@greeneggs/screens/settings/edit-profile-picture'
import { ProfileVisibility } from '@greeneggs/screens/settings/profile-visibility'
import { Settings } from '@greeneggs/screens/settings/settings'
import { LoggedInRoute } from '../types'

const routes: Array<{ name: LoggedInRoute; component: () => ReactElement }> = [
  { name: 'Navigation', component: Navigation },
  { name: 'Recipe', component: Recipe },
  { name: 'RecipeDescription', component: RecipeDescription },
  { name: 'CreateStep', component: CreateStep },
  { name: 'CreateDiet', component: CreateDiet },
  { name: 'CreateAllergy', component: CreateAllergy },
  { name: 'Settings', component: Settings },
  { name: 'EditProfile', component: EditProfile },
  { name: 'EditProfilePicture', component: EditProfilePicture },
  { name: 'ChangePassword', component: ChangePassword },
  { name: 'DeleteAccount', component: DeleteAccount },
  { name: 'Diets', component: DietaryPreferences },
  { name: 'Allergies', component: AllergyPreferences },
  { name: 'ProfileVisibility', component: ProfileVisibility },
  { name: 'RecipeAllComments', component: RecipeAllComments },
  { name: 'RecipeCommentReplies', component: RecipeCommentReplies },
  { name: 'RecipeAllIngredients', component: RecipeAllIngredients },
  { name: 'RecipeDirectionExpanded', component: RecipeDirectionExpanded },
  { name: 'SavedRecipes', component: SavedRecipes },
  { name: 'Profile', component: Profile },
  { name: 'RecipeSearchFilter', component: RecipeSearchFilter },
  { name: 'FilterIngredientsIncluded', component: FilterIngredientsIncluded },
  { name: 'FilterIngredientsExcluded', component: FilterIngredientsExcluded },
  { name: 'FilterRecipeCategories', component: FilterRecipeCategories },
  { name: 'FilterRecipeAllergies', component: FilterRecipeAllergies },
  { name: 'FilterRecipeDiets', component: FilterRecipeDiets },
  { name: 'FilterRecipeCookTime', component: FilterRecipeCookTime },
  { name: 'Following', component: Following },
  { name: 'Followers', component: Followers },
  { name: 'Category', component: Category },
  { name: 'AllCategories', component: AllCategories },
  { name: 'PickCategory', component: PickCategory },
  { name: 'PickIngredient', component: PickIngredient },
  { name: 'AddIngredientDetails', component: AddIngredientDetails },
]

/**
 * Array containing a list of all screens accessible to logged in users.
 */
export const loggedInRoutes = routes.map(({ name, component }) => (
  <Stack.Screen key={name} name={name} component={component} />
))
