/**
 * Author: Edward Jones
 */
import { UseFormReturn, useForm } from '@greeneggs/ui/form'
import { addRecipe, addRecipeVariables, RecipeInput } from '@greeneggs/types/graphql'
import { Mutations } from '@greeneggs/graphql'

/**
 * Hook that sets up a recipe creation form with our custom useForm hook
 */
export const useRecipeForm = (): UseFormReturn<RecipeInput, addRecipe, addRecipeVariables> =>
  useForm<RecipeInput, addRecipe, addRecipeVariables>({
    Mutation: Mutations.addRecipe,
    mutationVariableName: 'recipe',
    reactHookFormProps: {
      mode: 'all',
    },
  })
