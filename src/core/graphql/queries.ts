import { gql } from '@apollo/client';
import * as Fragments from './fragments';

export const GET_RECIPES = gql`
  query Recipes {
    recipes {
      ...RecipeFragment
    }
  }
  ${Fragments.RecipeFragment}
`;
