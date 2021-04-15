import { gql } from "@apollo/client";
import * as Fragments from "./fragments";

export const ADD_RECIPE = gql`
  mutation addRecipe($recipe: RecipeInput!) {
    addRecipe(recipe: $recipe) {
      data {
        ...RecipeFragment
      }
    }
  }
  ${Fragments.RecipeFragment}
`;
