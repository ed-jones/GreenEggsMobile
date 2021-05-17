/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addRecipe
// ====================================================

export interface addRecipe_addRecipe_data_submittedBy {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarURI: string | null;
}

export interface addRecipe_addRecipe_data {
  __typename: "Recipe";
  id: string;
  title: string;
  description: string;
  submittedBy: addRecipe_addRecipe_data_submittedBy;
  commentCount: number;
  likeCount: number;
  createdAt: string;
  servingCount: number;
  timeEstimate: string;
  previewURI: string;
}

export interface addRecipe_addRecipe {
  __typename: "RecipeResult";
  data: addRecipe_addRecipe_data | null;
}

export interface addRecipe {
  addRecipe: addRecipe_addRecipe;
}

export interface addRecipeVariables {
  recipe: RecipeInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Recipes
// ====================================================

export interface Recipes_recipes_submittedBy {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarURI: string | null;
}

export interface Recipes_recipes {
  __typename: "Recipe";
  id: string;
  title: string;
  description: string;
  submittedBy: Recipes_recipes_submittedBy;
  commentCount: number;
  likeCount: number;
  createdAt: string;
  servingCount: number;
  timeEstimate: string;
  previewURI: string;
}

export interface Recipes {
  recipes: Recipes_recipes[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserFragment
// ====================================================

export interface UserFragment {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarURI: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RecipeFragment
// ====================================================

export interface RecipeFragment_submittedBy {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarURI: string | null;
}

export interface RecipeFragment {
  __typename: "Recipe";
  id: string;
  title: string;
  description: string;
  submittedBy: RecipeFragment_submittedBy;
  commentCount: number;
  likeCount: number;
  createdAt: string;
  servingCount: number;
  timeEstimate: string;
  previewURI: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface RecipeInput {
  title: string;
  description: string;
  servingCount: number;
  timeEstimate: string;
  previewURI: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
