/**
 * Author: Edward Jones
 */
import { useForm } from '@greeneggs/ui'
import { addRecipe, addRecipeVariables, RecipeInput } from '@greeneggs/types/graphql'
import { Mutations } from '@greeneggs/graphql'

/**
 * Hook that sets up a recipe creation form with our custom useForm hook
 */
export const useRecipeForm = () =>
  useForm<RecipeInput, addRecipe, addRecipeVariables>(
    Mutations.ADD_RECIPE,
    'recipe',
    {},
    {
      mode: 'all',
    }
  )
