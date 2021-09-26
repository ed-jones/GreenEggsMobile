import { gql } from '@apollo/client';
import * as Fragments from './fragments';

// eslint-disable-next-line import/prefer-default-export
export const ADD_RECIPE = gql`
  mutation addRecipe($recipe: RecipeInput!) {
    addRecipe(recipe: $recipe) {
      data {
        ...RecipeFragment
      }
      error {
        ...ErrorFragment
      }
    }
  }
  ${Fragments.RecipeFragment}
  ${Fragments.ErrorFragment}
`;

export const LOGIN = gql`
  mutation login($loginDetails: LoginInput!) {
    login(loginDetails: $loginDetails) {
      data {
        token
      }
      error {
        ...ErrorFragment
      }
    }
  }
  ${Fragments.ErrorFragment}
`;

export const SIGNUP = gql`
  mutation signup($signupDetails: SignupInput!) {
    signup(signupDetails: $signupDetails) {
      data {
        token
      }
      error {
        ...ErrorFragment
      }
    }
  }
  ${Fragments.ErrorFragment}
`;

export const EDIT_PROFILE = gql`
  mutation editProfile($profileDetails: ProfileDetails!) {
    editProfile(profileDetails: $profileDetails) {
      data {
        ...FullUserFragment
      }
      error {
        ...ErrorFragment
      }
    }
  }
  ${Fragments.ErrorFragment}
  ${Fragments.FullUserFragment}
`;

export const CHANGE_PASSWORD = gql`
  mutation changePassword($changePasswordDetails: ChangePasswordDetails!) {
    changePassword(changePasswordDetails: $changePasswordDetails) {
      error {
        message
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser {
    deleteAccount {
      error {
        message
      }
    }
  }
`;

export const UPDATE_DIETARY_PREFERENCES = gql`
  mutation UpdateDietaryPreferences($dietaryPreferences: DietaryPreferenceDetails!) {
    updateDietaryPreferences(dietaryPreferenceDetails: $dietaryPreferences) {
      error {
        ...ErrorFragment
      }
      data {
        ...DietFragment
      }
    }
  }
  ${Fragments.DietFragment}
  ${Fragments.ErrorFragment}
`;

export const REMOVE_DIETARY_PREFERENCES = gql`
  mutation RemoveDietaryPreferences($dietaryPreferences: DietaryPreferenceDetails!) {
    removeDietaryPreferences(dietaryPreferenceDetails: $dietaryPreferences) {
      error {
        ...ErrorFragment
      }
      data {
        ...DietFragment
      }
    }
  }
  ${Fragments.DietFragment}
  ${Fragments.ErrorFragment}
`;

export const UPDATE_ALLERGY_PREFERENCES = gql`
  mutation UpdateAllergyPreferences($allergyPreferences: AllergyPreferenceDetails!) {
    updateAllergyPreferences(allergyPreferenceDetails: $allergyPreferences) {
      error {
        ...ErrorFragment
      }
      data {
        ...AllergyFragment
      }
    }
  }
  ${Fragments.AllergyFragment}
  ${Fragments.ErrorFragment}
`;

export const REMOVE_ALLERGY_PREFERENCES = gql`
  mutation RemoveAllergyPreferences($allergyPreferences: AllergyPreferenceDetails!) {
    removeAllergyPreferences(allergyPreferenceDetails: $allergyPreferences) {
      error {
        ...ErrorFragment
      }
      data {
        ...AllergyFragment
      }
    }
  }
  ${Fragments.AllergyFragment}
  ${Fragments.ErrorFragment}
`;

export const UPDATE_PROFILE_VISIBILITY = gql`
  mutation UpdateProfileVisibility($profileVisibilityDetails: ProfileVisibilityDetails!) {
    updateProfileVisibility(profileVisibilityDetails: $profileVisibilityDetails) {
      error {
        ...ErrorFragment
      }
    }
  }
  ${Fragments.ErrorFragment}
`;

export const ADD_RECIPE_COMMENT = gql`
  mutation AddRecipeComment($recipeId: String!, $comment: String!) {
    addComment(recipeId: $recipeId, comment: $comment) {
      data {
        ...RecipeCommentFragment
      }
      error {
        ...ErrorFragment
      }
    }
  }
  ${Fragments.RecipeCommentFragment}
  ${Fragments.ErrorFragment}
`;

export const ADD_RECIPE_COMMENT_REPLY = gql`
  mutation AddRecipeCommentReply($commentId: String!, $comment: String!) {
    replyToComment(commentId: $commentId, comment: $comment) {
      data {
        ...RecipeCommentFragment
      }
      error {
        ...ErrorFragment
      }
    }
  }
  ${Fragments.RecipeCommentFragment}
  ${Fragments.ErrorFragment}
`;

export const LIKE_RECIPE = gql`
  mutation LikeRecipe($recipeId: String!) {
    likeRecipe(recipeId: $recipeId) {
      error {
        ...ErrorFragment
      }
    }
  }
  ${Fragments.ErrorFragment}
`;

export const UNLIKE_RECIPE = gql`
  mutation UnlikeRecipe($recipeId: String!) {
    unlikeRecipe(recipeId: $recipeId) {
      error {
        ...ErrorFragment
      }
    }
  }
  ${Fragments.ErrorFragment}
`;

export const LIKE_COMMENT = gql`
  mutation LikeComment($commentId: String!) {
    likeComment(commentId: $commentId) {
      error {
        ...ErrorFragment
      }
    }
  }
  ${Fragments.ErrorFragment}
`;

export const UNLIKE_COMMENT = gql`
  mutation UnlikeComment($commentId: String!) {
    unlikeComment(commentId: $commentId) {
      error {
        ...ErrorFragment
      }
    }
  }
  ${Fragments.ErrorFragment}
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($commentId: String!) {
    deleteComment(commentId: $commentId) {
      error {
        ...ErrorFragment
      }
    }
  }
  ${Fragments.ErrorFragment}
`;

export const SAVE_RECIPE = gql`
  mutation SaveRecipe($recipeId: String!) {
    saveRecipe(recipeId: $recipeId) {
      error {
        ...ErrorFragment
      }
    }
  }
  ${Fragments.ErrorFragment}
`;