import { gql } from '@apollo/client';
import * as Fragments from './fragments';

// eslint-disable-next-line import/prefer-default-export
export const GET_RECIPES = gql`
  query Recipes {
    recipes {
      ...RecipeFragment
    }
  }
  ${Fragments.RecipeFragment}
`;
