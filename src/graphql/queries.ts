import { gql } from "@apollo/client";

export const GET_RECIPES = gql`
  query GetRecipes {
    allRecipes {
        title
        description
    }
  }
`;
