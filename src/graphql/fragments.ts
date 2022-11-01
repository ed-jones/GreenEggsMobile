/**
 * Author: Edward Jones
 *
 * Contains the definitions for all fragments used by Apollo within the app
 */
import { gql } from '@apollo/client'

export const userFragment = gql`
  fragment UserFragment on User {
    id
    firstName
    lastName
    bio
    email
    avatarURI
    verified
  }
`

export const dietFragment = gql`
  fragment DietFragment on Diet {
    id
    name
  }
`

export const allergyFragment = gql`
  fragment AllergyFragment on Allergy {
    id
    name
  }
`

export const fullUserFragment = gql`
  fragment FullUserFragment on FullUser {
    id
    firstName
    lastName
    bio
    email
    avatarURI
    verified
    likeCount
    followerCount
    followingCount
    recipeCount
    isFollowing
    dietaryPreferences {
      ...DietFragment
    }
    allergyPreferences {
      ...AllergyFragment
    }
    visibility
  }
  ${dietFragment}
  ${allergyFragment}
`

export const recipeCommentFragment = gql`
  fragment RecipeCommentFragment on RecipeComment {
    id
    contents
    likeCount
    replyCount
    liked
    createdAt
    deleted
    submittedBy {
      ...UserFragment
    }
    replies {
      id
      contents
      likeCount
      replyCount
      liked
      submittedBy {
        ...UserFragment
      }
    }
  }
  ${userFragment}
`

export const recipeFragment = gql`
  fragment RecipeFragment on Recipe {
    id
    title
    description
    submittedBy {
      ...UserFragment
    }
    commentCount
    likeCount
    createdAt
    servingCount
    timeEstimate
    coverImage
    liked
    saved
    categories {
      id
      name
    }
    diets {
      name
    }
    allergies {
      name
    }
    ingredients {
      name
      description
      quantity
      unit
    }
    steps {
      title
      description
      image
    }
    comments {
      ...RecipeCommentFragment
    }
  }
  ${userFragment}
  ${recipeCommentFragment}
`

export const errorFragment = gql`
  fragment ErrorFragment on Error {
    message
  }
`

export const ingredientFragment = gql`
  fragment IngredientFragment on Ingredient {
    name
    description
    quantity
    unit
  }
`

export const genericIngredientFragment = gql`
  fragment GenericIngredientFragment on GenericIngredient {
    id
    name
  }
`

export const categoryFragment = gql`
  fragment CategoryFragment on Category {
    id
    name
    coverImage
  }
`

export const notificationFragment = gql`
  fragment NotificationFragment on Notification {
    id
    type
    concerns {
      ...UserFragment
    }
    createdAt
    read
    linkId
  }
  ${userFragment}
`
