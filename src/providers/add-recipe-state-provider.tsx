import React, { useState, FC, createContext } from 'react';
import { addRecipe, addRecipeVariables, RecipeInput } from '@greeneggs/types/graphql';
import { IForm } from '@greeneggs/ui';
import { useRecipeForm } from '@greeneggs/screens/add-recipe/use-recipe-form';
import { AddRecipeAllergies } from '@greeneggs/screens/add-recipe/add-recipe-allergies';
import { AddRecipeCategories } from '@greeneggs/screens/add-recipe/add-recipe-categories';
import { AddRecipeDetails } from '@greeneggs/screens/add-recipe/add-recipe-details';
import { AddRecipeDiets } from '@greeneggs/screens/add-recipe/add-recipe-diets';
import { AddRecipeDirections } from '@greeneggs/screens/add-recipe/add-recipe-directions';
import { AddRecipeIngredients } from '@greeneggs/screens/add-recipe/add-recipe-ingredients';
import { PublishRecipe } from '@greeneggs/screens/add-recipe/publish-recipe';
import { ISteps, Step, useSteps } from '@greeneggs/screens/add-recipe/use-steps';


export interface AddRecipeContextInterface {
  form: IForm<RecipeInput, addRecipe, addRecipeVariables> | undefined;
  steps: ISteps | undefined;
}

export const AddRecipeContext = createContext<AddRecipeContextInterface>({
  form: undefined,
  steps: undefined,
});

export const AddRecipeStateProvider: FC = ({ children }) => {
  const form = useRecipeForm();

  const Steps: Step[] = [
    {
      title: "Ingredients",
      component: <AddRecipeIngredients form={form} />,
    },
    {
      title: "Directions",
      component: <AddRecipeDirections form={form} />,
    },
    {
      title: "Categories",
      component: <AddRecipeCategories form={form} />,
    },
    {
      title: "Allergies",
      component: <AddRecipeAllergies form={form} />,
    },
    {
      title: "Diets",
      component: <AddRecipeDiets form={form} />,
    },
    {
      title: "Details",
      component: <AddRecipeDetails form={form} />,
    },
    {
      title: "Privacy",
      component: <PublishRecipe form={form} />,
    },
  ];

  const steps = useSteps(Steps);

  return (
    <AddRecipeContext.Provider value={{ form, steps }}>
      {children}
    </AddRecipeContext.Provider>
  );
};
