import { gql } from '@apollo/client';
import * as Fragments from './fragments';

// eslint-disable-next-line import/prefer-default-export
export const GET_RECIPES = gql`
  query recipes {
    recipes {
      ...RecipeFragment
    }
  }
  ${Fragments.RecipeFragment}
`;

export const GET_RECIPE = gql`
  query recipe($recipeId: String!) {
    recipe(recipeId: $recipeId) {
      ...RecipeFragment
    }
  }
  ${Fragments.RecipeFragment}
`;