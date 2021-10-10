import { useForm } from '@greeneggs/ui';
import { addRecipe, addRecipeVariables, RecipeInput } from '@greeneggs/types/graphql';
import { Mutations } from '@greeneggs/graphql';

export const useRecipeForm = () => useForm<RecipeInput, addRecipe, addRecipeVariables>(Mutations.ADD_RECIPE, 'recipe', {}, {
    mode: 'all'
});
