import { Mutations, useForm } from '@greeneggs/core';
import { addRecipe, addRecipeVariables, RecipeInput } from '@greeneggs/types/graphql';

const useRecipeForm = () => useForm<RecipeInput, addRecipe, addRecipeVariables>(Mutations.ADD_RECIPE, 'recipe', {}, {
    mode: 'all'
});

export default useRecipeForm;
