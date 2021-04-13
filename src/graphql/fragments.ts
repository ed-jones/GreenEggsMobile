import { gql } from "@apollo/client";

export const RecipeFragment = gql`
  fragment RecipeFragment on Recipe {
    title
    description
  }
`;
