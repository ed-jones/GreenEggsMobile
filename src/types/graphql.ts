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
// GraphQL mutation operation: login
// ====================================================

export interface login_login_data {
  __typename: "AuthResultData";
  token: string;
}

export interface login_login_error {
  __typename: "Error";
  message: string;
}

export interface login_login {
  __typename: "AuthResult";
  data: login_login_data | null;
  error: login_login_error | null;
}

export interface login {
  login: login_login;
}

export interface loginVariables {
  loginDetails: LoginInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: signup
// ====================================================

export interface signup_signup_data {
  __typename: "AuthResultData";
  token: string;
}

export interface signup_signup_error {
  __typename: "Error";
  message: string;
}

export interface signup_signup {
  __typename: "AuthResult";
  data: signup_signup_data | null;
  error: signup_signup_error | null;
}

export interface signup {
  signup: signup_signup;
}

export interface signupVariables {
  signupDetails: SignupInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: recipes
// ====================================================

export interface recipes_recipes_submittedBy {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarURI: string | null;
}

export interface recipes_recipes {
  __typename: "Recipe";
  id: string;
  title: string;
  description: string;
  submittedBy: recipes_recipes_submittedBy;
  commentCount: number;
  likeCount: number;
  createdAt: string;
  servingCount: number;
  timeEstimate: string;
  previewURI: string;
}

export interface recipes {
  recipes: recipes_recipes[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: recipe
// ====================================================

export interface recipe_recipe_submittedBy {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarURI: string | null;
}

export interface recipe_recipe {
  __typename: "Recipe";
  id: string;
  title: string;
  description: string;
  submittedBy: recipe_recipe_submittedBy;
  commentCount: number;
  likeCount: number;
  createdAt: string;
  servingCount: number;
  timeEstimate: string;
  previewURI: string;
}

export interface recipe {
  recipe: recipe_recipe;
}

export interface recipeVariables {
  recipeId: string;
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

export interface LoginInput {
  email: string;
  password: string;
}

export interface RecipeInput {
  title: string;
  description: string;
  servingCount: number;
  timeEstimate: string;
  previewURI: string;
}

export interface SignupInput {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
