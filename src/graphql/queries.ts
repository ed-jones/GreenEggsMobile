import { gql } from '@apollo/client';
import * as Fragments from './fragments';

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

export const ME = gql`
  query Me {
    me {
      data {
        ...FullUserFragment
      }
    }
  }
  ${Fragments.FullUserFragment}
`;

export const GET_DIETS = gql`
  query Diets($offset: Int!, $limit: Int!, $query: String!) {
    diets(offset: $offset, limit: $limit, query: $query) {
      data {
        ...DietFragment
      }
      error {
        ...ErrorFragment
      }
    }
  }
  ${Fragments.DietFragment}
  ${Fragments.ErrorFragment}
`;

export const GET_ALLERGIES = gql`
  query Allergies($offset: Int!, $limit: Int!, $query: String!) {
    allergies(offset: $offset, limit: $limit, query: $query) {
      data {
        ...AllergyFragment
      }
      error {
        ...ErrorFragment
      }
    }
  }
  ${Fragments.AllergyFragment}
  ${Fragments.ErrorFragment}
`;

export const GET_COMMENT = gql`
  query comment($commentId: String!) {
    comment(commentId: $commentId) {
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

export const GET_SAVED_RECIPES = gql`
  query savedRecipes($offset: Int!, $limit: Int!) {
    savedRecipes(offset: $offset, limit: $limit) {
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

export const GET_PROFILE = gql`
  query profile($userId: String!) {
    profile(userId: $userId) {
      data {
        ...FullUserFragment
      }
      error {
        ...ErrorFragment
      }
    }
  }
  ${Fragments.FullUserFragment}
  ${Fragments.ErrorFragment}
`;

export const GET_INGREDIENTS = gql`
  query Ingredients($offset: Int!, $limit: Int!, $query: String!) {
    ingredients(offset: $offset, limit: $limit, query: $query) {
      data {
        ...GenericIngredientFragment
      }
      error {
        ...ErrorFragment
      }
    }
  }
  ${Fragments.GenericIngredientFragment}
  ${Fragments.ErrorFragment}
`;

export const GET_CATEGORIES = gql`
  query Categories($offset: Int!, $limit: Int!, $query: String!) {
    categories(offset: $offset, limit: $limit, query: $query) {
      data {
        ...CategoryFragment
      }
      error {
        ...ErrorFragment
      }
    }
  }
  ${Fragments.CategoryFragment}
  ${Fragments.ErrorFragment}
`;

export const GET_USERS = gql`
  query Users($offset: Int!, $limit: Int!, $query: String!, $sort: Sort!) {
    users(offset: $offset, limit: $limit, query: $query, sort: $sort) {
      data {
        ...UserFragment
      }
      error {
        ...ErrorFragment
      }
    }
  }
  ${Fragments.UserFragment}
  ${Fragments.ErrorFragment}
`;

export const GET_FOLLOWING_USERS = gql`
  query FollowingUsers($userId: String!, $offset: Int!, $limit: Int!, $query: String!) {
    followingUsers(userId: $userId, offset: $offset, limit: $limit, query: $query) {
      error {
        ...ErrorFragment
      }
      data {
        ...UserFragment
      }
    }
  }
  ${Fragments.UserFragment}
  ${Fragments.ErrorFragment}
`;

export const GET_FOLLOWED_USERS = gql`
  query FollowedUsers($userId: String!, $offset: Int!, $limit: Int!, $query: String!) {
    followedUsers(userId: $userId, offset: $offset, limit: $limit, query: $query) {
      error {
        ...ErrorFragment
      }
      data {
        ...UserFragment
      }
    }
  }
  ${Fragments.UserFragment}
  ${Fragments.ErrorFragment}
`;

export const GET_NOTIFICATIONS = gql`
  query Notifications {
    notifications {
      data {
        ...NotificationFragment
      }
      error {
        ...ErrorFragment
      }
    }
  }
  ${Fragments.NotificationFragment}
  ${Fragments.ErrorFragment}
`;
