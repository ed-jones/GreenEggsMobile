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
        message
      }
    }
  }
  ${Fragments.RecipeFragment}
`;

export const LOGIN = gql`
  mutation login($loginDetails: LoginInput!) {
    login(loginDetails: $loginDetails) {
      data {
        token
      }
      error {
        message
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation signup($signupDetails: SignupInput!) {
    signup(signupDetails: $signupDetails) {
      data {
        token
      }
      error {
        message
      }
    }
  }
`;