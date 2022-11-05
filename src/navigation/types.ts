import { StackNavigationProp } from '@react-navigation/stack'
import {
  recipe_recipe_data_comments,
  recipe_recipe_data_ingredients,
  recipe_recipe_data_steps,
  Users_users_data,
} from '@greeneggs/types/graphql'

export type LoggedInRoute =
  | 'Navigation'
  | 'Recipe'
  | 'RecipeDescription'
  | 'CreateStep'
  | 'CreateDiet'
  | 'CreateAllergy'
  | 'Settings'
  | 'EditProfile'
  | 'EditProfilePicture'
  | 'ChangePassword'
  | 'DeleteAccount'
  | 'Diets'
  | 'Allergies'
  | 'ProfileVisibility'
  | 'RecipeAllComments'
  | 'RecipeCommentReplies'
  | 'RecipeAllIngredients'
  | 'RecipeDirectionExpanded'
  | 'SavedRecipes'
  | 'Profile'
  | 'RecipeSearchFilter'
  | 'FilterIngredientsIncluded'
  | 'FilterIngredientsExcluded'
  | 'FilterRecipeCategories'
  | 'FilterRecipeAllergies'
  | 'FilterRecipeDiets'
  | 'FilterRecipeCookTime'
  | 'Following'
  | 'Followers'
  | 'Category'
  | 'AllCategories'
  | 'PickCategory'
  | 'PickIngredient'
  | 'AddIngredientDetails'

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

export type LoggedInRouteParams = RouteParams<LoggedInRoute, LoggedInRouteParamsOverride>

export type LoggedInNavigationProp = NavigationProp<LoggedInRoute, LoggedInRouteParamsOverride>

export type NavigationProp<TRoute extends string, TParams> = StackNavigationProp<RouteParams<TRoute, TParams>>

export type RouteParams<TRoute extends string, TParams> = Omit<
  {
    [key in TRoute]: undefined
  },
  keyof TParams
> &
  TParams

export type LoggedOutRoute = 'Welcome' | 'Login' | 'Signup' | 'Privacy'

export type LoggedOutNavigationProp = StackNavigationProp<LoggedOutRouteParams>

export type LoggedOutRouteParams = {
  [key in LoggedOutRoute]: undefined
}
