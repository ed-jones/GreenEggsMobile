/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addRecipe
// ====================================================

export interface addRecipe_addRecipe_data {
  __typename: "Recipe";
  title: string;
  description: string;
}

export interface addRecipe_addRecipe {
  __typename: "AddRecipeResult";
  data: addRecipe_addRecipe_data;
}

export interface addRecipe {
  addRecipe: addRecipe_addRecipe;
}

export interface addRecipeVariables {
  recipe: AddRecipeInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRecipes
// ====================================================

export interface GetRecipes_allRecipes {
  __typename: "Recipe";
  title: string;
  description: string;
}

export interface GetRecipes {
  allRecipes: GetRecipes_allRecipes[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface AddRecipeInput {
  title: string;
  description: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
