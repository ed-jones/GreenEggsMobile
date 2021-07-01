import { gql } from '@apollo/client';

export const UserFragment = gql`
  fragment UserFragment on User {
    id
    firstName
    lastName
    email
    avatarURI
  }
`;

export const RecipeFragment = gql`
  fragment RecipeFragment on Recipe {
    id
    title
    subtitle
    description
    submittedBy {
      ...UserFragment
    }
    commentCount
    likeCount
    createdAt
    servingCount
    timeEstimate
    previewURI
  }
  ${UserFragment}
`;

export const ErrorFragment = gql`
  fragment ErrorFragment on Error {
    message
  }
`;
