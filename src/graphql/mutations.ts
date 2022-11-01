/**
 * Author: Edward Jones
 *
 *  Contains the definitions for all mutations used by Apollo within the app
 */
import { gql } from '@apollo/client'
import * as Fragments from './fragments'

export const addRecipe = gql`
  mutation addRecipe($recipe: RecipeInput!) {
    addRecipe(recipe: $recipe) {
      data {
        ...RecipeFragment
      }
      error {
        ...errorFragment
      }
    }
  }
  ${Fragments.recipeFragment}
  ${Fragments.errorFragment}
`

export const login = gql`
  mutation login($loginDetails: LoginInput!) {
    login(loginDetails: $loginDetails) {
      data {
        token
      }
      error {
        ...errorFragment
      }
    }
  }
  ${Fragments.errorFragment}
`

export const signup = gql`
  mutation signup($signupDetails: SignupInput!) {
    signup(signupDetails: $signupDetails) {
      data {
        token
      }
      error {
        ...errorFragment
      }
    }
  }
  ${Fragments.errorFragment}
`

export const editProfile = gql`
  mutation editProfile($profileDetails: ProfileDetails!) {
    editProfile(profileDetails: $profileDetails) {
      data {
        ...FulluserFragment
      }
      error {
        ...errorFragment
      }
    }
  }
  ${Fragments.errorFragment}
  ${Fragments.fullUserFragment}
`

export const changePassword = gql`
  mutation changePassword($changePasswordDetails: ChangePasswordDetails!) {
    changePassword(changePasswordDetails: $changePasswordDetails) {
      error {
        message
      }
    }
  }
`

export const deleteUser = gql`
  mutation deleteUser {
    deleteAccount {
      error {
        message
      }
    }
  }
`

export const updateDietaryPreferences = gql`
  mutation UpdateDietaryPreferences($dietaryPreferences: DietaryPreferenceDetails!) {
    updateDietaryPreferences(dietaryPreferenceDetails: $dietaryPreferences) {
      error {
        ...errorFragment
      }
      data {
        ...DietFragment
      }
    }
  }
  ${Fragments.dietFragment}
  ${Fragments.errorFragment}
`

export const removeDietaryPreferences = gql`
  mutation RemoveDietaryPreferences($dietaryPreferences: DietaryPreferenceDetails!) {
    removeDietaryPreferences(dietaryPreferenceDetails: $dietaryPreferences) {
      error {
        ...errorFragment
      }
      data {
        ...DietFragment
      }
    }
  }
  ${Fragments.dietFragment}
  ${Fragments.errorFragment}
`

export const updateAllergyPreferences = gql`
  mutation UpdateAllergyPreferences($allergyPreferences: AllergyPreferenceDetails!) {
    updateAllergyPreferences(allergyPreferenceDetails: $allergyPreferences) {
      error {
        ...errorFragment
      }
      data {
        ...AllergyFragment
      }
    }
  }
  ${Fragments.allergyFragment}
  ${Fragments.errorFragment}
`

export const removeAllergyPreferences = gql`
  mutation RemoveAllergyPreferences($allergyPreferences: AllergyPreferenceDetails!) {
    removeAllergyPreferences(allergyPreferenceDetails: $allergyPreferences) {
      error {
        ...errorFragment
      }
      data {
        ...AllergyFragment
      }
    }
  }
  ${Fragments.allergyFragment}
  ${Fragments.errorFragment}
`

export const updateProfileVisibility = gql`
  mutation UpdateProfileVisibility($profileVisibilityDetails: ProfileVisibilityDetails!) {
    updateProfileVisibility(profileVisibilityDetails: $profileVisibilityDetails) {
      error {
        ...errorFragment
      }
    }
  }
  ${Fragments.errorFragment}
`

export const addRecipeComment = gql`
  mutation AddRecipeComment($recipeId: String!, $comment: String!) {
    addComment(recipeId: $recipeId, comment: $comment) {
      data {
        ...RecipeCommentFragment
      }
      error {
        ...errorFragment
      }
    }
  }
  ${Fragments.recipeCommentFragment}
  ${Fragments.errorFragment}
`

export const addRecipeCommentReply = gql`
  mutation AddRecipeCommentReply($commentId: String!, $comment: String!) {
    replyToComment(commentId: $commentId, comment: $comment) {
      data {
        ...RecipeCommentFragment
      }
      error {
        ...errorFragment
      }
    }
  }
  ${Fragments.recipeCommentFragment}
  ${Fragments.errorFragment}
`

export const likeRecipe = gql`
  mutation LikeRecipe($recipeId: String!) {
    likeRecipe(recipeId: $recipeId) {
      data {
        ...RecipeFragment
      }
      error {
        ...errorFragment
      }
    }
  }
  ${Fragments.recipeFragment}
  ${Fragments.errorFragment}
`

export const unlikeRecipe = gql`
  mutation UnlikeRecipe($recipeId: String!) {
    unlikeRecipe(recipeId: $recipeId) {
      data {
        ...RecipeFragment
      }
      error {
        ...errorFragment
      }
    }
  }
  ${Fragments.recipeFragment}
  ${Fragments.errorFragment}
`

export const likeComment = gql`
  mutation LikeComment($commentId: String!) {
    likeComment(commentId: $commentId) {
      error {
        ...errorFragment
      }
    }
  }
  ${Fragments.errorFragment}
`

export const unlikeComment = gql`
  mutation UnlikeComment($commentId: String!) {
    unlikeComment(commentId: $commentId) {
      error {
        ...errorFragment
      }
    }
  }
  ${Fragments.errorFragment}
`

export const deleteComment = gql`
  mutation DeleteComment($commentId: String!) {
    deleteComment(commentId: $commentId) {
      error {
        ...errorFragment
      }
    }
  }
  ${Fragments.errorFragment}
`

export const saveRecipe = gql`
  mutation SaveRecipe($recipeId: String!) {
    saveRecipe(recipeId: $recipeId) {
      data {
        ...RecipeFragment
      }
      error {
        ...errorFragment
      }
    }
  }
  ${Fragments.recipeFragment}
  ${Fragments.errorFragment}
`

export const unsaveRecipe = gql`
  mutation UnsaveRecipe($recipeId: String!) {
    unsaveRecipe(recipeId: $recipeId) {
      data {
        ...RecipeFragment
      }
      error {
        ...errorFragment
      }
    }
  }
  ${Fragments.recipeFragment}
  ${Fragments.errorFragment}
`

export const followUser = gql`
  mutation FollowUser($userId: String!) {
    followUser(userId: $userId) {
      error {
        ...errorFragment
      }
      data {
        ...userFragment
      }
    }
  }
  ${Fragments.errorFragment}
  ${Fragments.userFragment}
`

export const unfollowUser = gql`
  mutation UnfollowUser($userId: String!) {
    unfollowUser(userId: $userId) {
      error {
        ...errorFragment
      }
      data {
        ...userFragment
      }
    }
  }
  ${Fragments.errorFragment}
  ${Fragments.userFragment}
`

export const readNotifications = gql`
  mutation ReadNotification($notificationId: String!) {
    readNotification(notificationId: $notificationId) {
      data {
        ...NotificationFragment
      }
      error {
        ...errorFragment
      }
    }
  }
  ${Fragments.notificationFragment}
  ${Fragments.errorFragment}
`

export const deleteRecipe = gql`
  mutation DeleteRecipe($recipeId: String!) {
    deleteRecipe(recipeId: $recipeId) {
      data {
        ...RecipeFragment
      }
      error {
        ...errorFragment
      }
    }
  }
  ${Fragments.recipeFragment}
  ${Fragments.errorFragment}
`
