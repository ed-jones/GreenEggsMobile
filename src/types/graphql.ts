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

export interface addRecipe_addRecipe_data_categories {
  __typename: "Category";
  name: string;
}

export interface addRecipe_addRecipe_data_diets {
  __typename: "Diet";
  name: string;
}

export interface addRecipe_addRecipe_data_allergies {
  __typename: "Allergy";
  name: string;
}

export interface addRecipe_addRecipe_data_ingredients {
  __typename: "Ingredient";
  name: string;
  description: string | null;
  quantity: number;
  unit: string | null;
}

export interface addRecipe_addRecipe_data_steps {
  __typename: "RecipeStep";
  title: string;
  description: string;
  image: string;
}

export interface addRecipe_addRecipe_data {
  __typename: "Recipe";
  id: string;
  subtitle: string;
  title: string;
  description: string;
  submittedBy: addRecipe_addRecipe_data_submittedBy;
  commentCount: number;
  likeCount: number;
  createdAt: string;
  servingCount: number;
  timeEstimate: string;
  coverImage: string;
  categories: (addRecipe_addRecipe_data_categories | null)[];
  diets: (addRecipe_addRecipe_data_diets | null)[];
  allergies: (addRecipe_addRecipe_data_allergies | null)[];
  ingredients: (addRecipe_addRecipe_data_ingredients | null)[];
  steps: (addRecipe_addRecipe_data_steps | null)[];
}

export interface addRecipe_addRecipe_error {
  __typename: "Error";
  message: string;
}

export interface addRecipe_addRecipe {
  __typename: "RecipeResult";
  data: addRecipe_addRecipe_data | null;
  error: addRecipe_addRecipe_error | null;
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

export interface recipes_recipes_data_submittedBy {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarURI: string | null;
}

export interface recipes_recipes_data_categories {
  __typename: "Category";
  name: string;
}

export interface recipes_recipes_data_diets {
  __typename: "Diet";
  name: string;
}

export interface recipes_recipes_data_allergies {
  __typename: "Allergy";
  name: string;
}

export interface recipes_recipes_data_ingredients {
  __typename: "Ingredient";
  name: string;
  description: string | null;
  quantity: number;
  unit: string | null;
}

export interface recipes_recipes_data_steps {
  __typename: "RecipeStep";
  title: string;
  description: string;
  image: string;
}

export interface recipes_recipes_data {
  __typename: "Recipe";
  id: string;
  subtitle: string;
  title: string;
  description: string;
  submittedBy: recipes_recipes_data_submittedBy;
  commentCount: number;
  likeCount: number;
  createdAt: string;
  servingCount: number;
  timeEstimate: string;
  coverImage: string;
  categories: (recipes_recipes_data_categories | null)[];
  diets: (recipes_recipes_data_diets | null)[];
  allergies: (recipes_recipes_data_allergies | null)[];
  ingredients: (recipes_recipes_data_ingredients | null)[];
  steps: (recipes_recipes_data_steps | null)[];
}

export interface recipes_recipes_error {
  __typename: "Error";
  message: string;
}

export interface recipes_recipes {
  __typename: "RecipesResult";
  data: (recipes_recipes_data | null)[] | null;
  error: recipes_recipes_error | null;
}

export interface recipes {
  recipes: recipes_recipes;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: recipe
// ====================================================

export interface recipe_recipe_data_submittedBy {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarURI: string | null;
}

export interface recipe_recipe_data_categories {
  __typename: "Category";
  name: string;
}

export interface recipe_recipe_data_diets {
  __typename: "Diet";
  name: string;
}

export interface recipe_recipe_data_allergies {
  __typename: "Allergy";
  name: string;
}

export interface recipe_recipe_data_ingredients {
  __typename: "Ingredient";
  name: string;
  description: string | null;
  quantity: number;
  unit: string | null;
}

export interface recipe_recipe_data_steps {
  __typename: "RecipeStep";
  title: string;
  description: string;
  image: string;
}

export interface recipe_recipe_data {
  __typename: "Recipe";
  id: string;
  subtitle: string;
  title: string;
  description: string;
  submittedBy: recipe_recipe_data_submittedBy;
  commentCount: number;
  likeCount: number;
  createdAt: string;
  servingCount: number;
  timeEstimate: string;
  coverImage: string;
  categories: (recipe_recipe_data_categories | null)[];
  diets: (recipe_recipe_data_diets | null)[];
  allergies: (recipe_recipe_data_allergies | null)[];
  ingredients: (recipe_recipe_data_ingredients | null)[];
  steps: (recipe_recipe_data_steps | null)[];
}

export interface recipe_recipe_error {
  __typename: "Error";
  message: string;
}

export interface recipe_recipe {
  __typename: "RecipeResult";
  data: recipe_recipe_data | null;
  error: recipe_recipe_error | null;
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

export interface RecipeFragment_categories {
  __typename: "Category";
  name: string;
}

export interface RecipeFragment_diets {
  __typename: "Diet";
  name: string;
}

export interface RecipeFragment_allergies {
  __typename: "Allergy";
  name: string;
}

export interface RecipeFragment_ingredients {
  __typename: "Ingredient";
  name: string;
  description: string | null;
  quantity: number;
  unit: string | null;
}

export interface RecipeFragment_steps {
  __typename: "RecipeStep";
  title: string;
  description: string;
  image: string;
}

export interface RecipeFragment {
  __typename: "Recipe";
  id: string;
  subtitle: string;
  title: string;
  description: string;
  submittedBy: RecipeFragment_submittedBy;
  commentCount: number;
  likeCount: number;
  createdAt: string;
  servingCount: number;
  timeEstimate: string;
  coverImage: string;
  categories: (RecipeFragment_categories | null)[];
  diets: (RecipeFragment_diets | null)[];
  allergies: (RecipeFragment_allergies | null)[];
  ingredients: (RecipeFragment_ingredients | null)[];
  steps: (RecipeFragment_steps | null)[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ErrorFragment
// ====================================================

export interface ErrorFragment {
  __typename: "Error";
  message: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Privacy {
  FRIENDS = "FRIENDS",
  PRIVATE = "PRIVATE",
  PUBLIC = "PUBLIC",
}

export interface AllergyInput {
  name: string;
}

export interface CategoryInput {
  name: string;
}

export interface DietInput {
  name: string;
}

export interface IngredientInput {
  name: string;
  description?: string | null;
  quantity: number;
  unit?: string | null;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RecipeInput {
  title: string;
  subtitle: string;
  description: string;
  servingCount: number;
  timeEstimate: string;
  coverImage: any;
  categories: (CategoryInput | null)[];
  diets: (DietInput | null)[];
  allergies: (AllergyInput | null)[];
  ingredients: (IngredientInput | null)[];
  steps: (RecipeStepInput | null)[];
  visibility: Privacy;
  likeability: Privacy;
  commentability: Privacy;
}

export interface RecipeStepInput {
  image: any;
  title: string;
  description: string;
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
