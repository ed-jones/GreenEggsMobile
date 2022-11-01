/**
 * Author: Edward Jones
 */
import { IForm, useForm } from '@greeneggs/ui'
import { addRecipe, addRecipeVariables, RecipeInput } from '@greeneggs/types/graphql'
import { Mutations } from '@greeneggs/graphql'

/**
 * Hook that sets up a recipe creation form with our custom useForm hook
 */
export const useRecipeForm = (): IForm<RecipeInput, addRecipe, addRecipeVariables> =>
  useForm<RecipeInput, addRecipe, addRecipeVariables>(
    Mutations.addRecipe,
    'recipe',
    {},
    {
      mode: 'all',
    }
  )
