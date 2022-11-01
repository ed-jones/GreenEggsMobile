/**
 * Author: Edward Jones
 */
import React, { createContext, PropsWithChildren } from 'react'
import { addRecipe, addRecipeVariables, RecipeInput } from '@greeneggs/types/graphql'
import { IForm } from '@greeneggs/ui'
import { useRecipeForm } from '@greeneggs/screens/add-recipe/use-recipe-form'
import { AddRecipeAllergies } from '@greeneggs/screens/add-recipe/add-recipe-allergies'
import { AddRecipeCategories } from '@greeneggs/screens/add-recipe/add-recipe-categories'
import { AddRecipeDetails } from '@greeneggs/screens/add-recipe/add-recipe-details'
import { AddRecipeDiets } from '@greeneggs/screens/add-recipe/add-recipe-diets'
import { AddRecipeDirections } from '@greeneggs/screens/add-recipe/add-recipe-directions'
import { AddRecipeIngredients } from '@greeneggs/screens/add-recipe/add-recipe-ingredients'
import { PublishRecipe } from '@greeneggs/screens/add-recipe/publish-recipe'
import { ISteps, Step, useSteps } from '@greeneggs/screens/add-recipe/use-steps'
import { useFieldArray, UseFieldArrayReturn } from 'react-hook-form'

export interface AddRecipeContextInterface {
  form?: IForm<RecipeInput, addRecipe, addRecipeVariables>
  steps?: ISteps
  categoriesFieldArray?: UseFieldArrayReturn<RecipeInput, 'categories', 'id'>
  ingredientsFieldArray?: UseFieldArrayReturn<RecipeInput, 'ingredients', 'id'>
  stepsFieldArray?: UseFieldArrayReturn<RecipeInput, 'steps', 'id'>
  allergiesFieldArray?: UseFieldArrayReturn<RecipeInput, 'allergies', 'id'>
  dietsFieldArray?: UseFieldArrayReturn<RecipeInput, 'diets', 'id'>
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AddRecipeContext = createContext<AddRecipeContextInterface>({})

/**
 * State provider that lets all child components control the state of a recipe form.
 */
export function AddRecipeStateProvider({ children }: PropsWithChildren<object>) {
  const form = useRecipeForm()

  const steps: Step[] = [
    {
      title: 'Details',
      component: <AddRecipeDetails form={form} />,
    },
    {
      title: 'Ingredients',
      component: <AddRecipeIngredients form={form} />,
    },
    {
      title: 'Steps',
      component: <AddRecipeDirections form={form} />,
    },
    {
      title: 'Categories',
      component: <AddRecipeCategories />,
    },
    {
      title: 'Allergies',
      component: <AddRecipeAllergies />,
    },
    {
      title: 'Diets',
      component: <AddRecipeDiets />,
    },
    {
      title: 'Cover Image',
      component: <PublishRecipe form={form} />,
    },
  ]

  const categoriesFieldArray = useFieldArray({
    control: form.control,
    name: 'categories',
  })

  const ingredientsFieldArray = useFieldArray({
    control: form.control,
    name: 'ingredients',
  })

  const stepsFieldArray = useFieldArray({
    control: form.control,
    name: 'steps',
  })

  const allergiesFieldArray = useFieldArray({
    control: form.control,
    name: 'allergies',
  })

  const dietsFieldArray = useFieldArray({
    control: form.control,
    name: 'diets',
  })

  return (
    <AddRecipeContext.Provider
      value={{
        form,
        steps: useSteps(steps),
        categoriesFieldArray,
        ingredientsFieldArray,
        stepsFieldArray,
        allergiesFieldArray,
        dietsFieldArray,
      }}
    >
      {children}
    </AddRecipeContext.Provider>
  )
}
