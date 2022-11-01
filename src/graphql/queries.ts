/**
 * Author: Edward Jones
 *
 * Contains the definitions for all queries used by Apollo within the app
 */
import { gql } from '@apollo/client'
import * as Fragments from './fragments'

export const getRecipes = gql`
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
  ${Fragments.recipeFragment}
  ${Fragments.errorFragment}
`

export const getNewsFeed = gql`
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
  ${Fragments.recipeFragment}
  ${Fragments.errorFragment}
`

export const getTrending = gql`
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
  ${Fragments.recipeFragment}
  ${Fragments.errorFragment}
`

export const getRecipe = gql`
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
  ${Fragments.recipeFragment}
  ${Fragments.errorFragment}
`

export const getMe = gql`
  query Me {
    me {
      data {
        ...FullUserFragment
      }
    }
  }
  ${Fragments.fullUserFragment}
`

export const getDiets = gql`
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
  ${Fragments.dietFragment}
  ${Fragments.errorFragment}
`

export const getAllergies = gql`
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
  ${Fragments.allergyFragment}
  ${Fragments.errorFragment}
`

export const getComment = gql`
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
  ${Fragments.recipeCommentFragment}
  ${Fragments.errorFragment}
`

export const getSavedRecipes = gql`
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
  ${Fragments.recipeFragment}
  ${Fragments.errorFragment}
`

export const getProfile = gql`
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
  ${Fragments.fullUserFragment}
  ${Fragments.errorFragment}
`

export const getIngredients = gql`
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
  ${Fragments.genericIngredientFragment}
  ${Fragments.errorFragment}
`

export const getCategories = gql`
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
  ${Fragments.categoryFragment}
  ${Fragments.errorFragment}
`

export const getCategoriesWithImages = gql`
  query CategoriesWithImages($offset: Int!, $limit: Int!, $query: String!) {
    categoriesWithImages(offset: $offset, limit: $limit, query: $query) {
      data {
        ...CategoryFragment
      }
      error {
        ...ErrorFragment
      }
    }
  }
  ${Fragments.categoryFragment}
  ${Fragments.errorFragment}
`

export const getUsers = gql`
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
  ${Fragments.userFragment}
  ${Fragments.errorFragment}
`

export const getFollowingUsers = gql`
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
  ${Fragments.userFragment}
  ${Fragments.errorFragment}
`

export const getFollowedUsers = gql`
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
  ${Fragments.userFragment}
  ${Fragments.errorFragment}
`

export const getNotifications = gql`
  query notifications($offset: Int!, $limit: Int!) {
    notifications(offset: $offset, limit: $limit) {
      data {
        ...NotificationFragment
      }
      error {
        ...ErrorFragment
      }
    }
  }
  ${Fragments.notificationFragment}
  ${Fragments.errorFragment}
`

export const getNotificationCount = gql`
  query NotificationCount {
    notificationCount {
      data {
        notificationCount
      }
      error {
        ...ErrorFragment
      }
    }
  }
  ${Fragments.errorFragment}
`
