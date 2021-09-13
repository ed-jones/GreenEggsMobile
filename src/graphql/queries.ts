import { gql } from '@apollo/client';
import * as Fragments from './fragments';

// eslint-disable-next-line import/prefer-default-export
export const GET_RECIPES = gql`
  query recipes($offset: Int!, $limit: Int!, $query: String!, $sort: Sort!, $filter: RecipeFilter!) {
    recipes(offset: $offset, limit: $limit, query: $query, sort: $sort, filter: $filter) {
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

export const NEWS_FEED = gql`
  query NewsFeed($offset: Int!, $limit: Int!) {
    newsFeed(offset: $offset, limit: $limit) {
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

export const TRENDING = gql`
  query Trending($offset: Int!, $limit: Int!) {
    trending(offset: $offset, limit: $limit) {
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

export const GET_RECIPE = gql`
  query recipe($recipeId: String!) {
    recipe(recipeId: $recipeId) {
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