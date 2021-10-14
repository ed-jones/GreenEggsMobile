import { gql } from '@apollo/client';
import { G } from 'react-native-svg';

export const UserFragment = gql`
  fragment UserFragment on User {
    id
    firstName
    lastName
    bio
    email
    avatarURI
    verified
  }
`;

export const DietFragment = gql`
  fragment DietFragment on Diet {
    id
    name
  }
`;

export const AllergyFragment = gql`
  fragment AllergyFragment on Allergy {
    id
    name
  }
`;

export const FullUserFragment = gql`
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
  ${DietFragment}
  ${AllergyFragment}
`;


export const RecipeCommentFragment = gql`
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
  ${UserFragment}
`;

export const RecipeFragment = gql`
  fragment RecipeFragment on Recipe {
    id
    subtitle
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
  ${UserFragment}
  ${RecipeCommentFragment}
`;

export const ErrorFragment = gql`
  fragment ErrorFragment on Error {
    message
  }
`;

export const IngredientFragment = gql`
  fragment IngredientFragment on Ingredient {
    name
    description
    quantity
    unit
  }
`;

export const GenericIngredientFragment = gql`
  fragment GenericIngredientFragment on GenericIngredient {
    id
    name
  }
`;

export const CategoryFragment = gql`
  fragment CategoryFragment on Category {
    id
    name
    coverImage
  }
`;

export const NotificationFragment = gql`
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
  ${UserFragment}
`;
