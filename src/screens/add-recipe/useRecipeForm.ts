import { Fragments, Mutations, useForm } from '@greeneggs/core';
import { addRecipe, addRecipeVariables, RecipeInput } from '@greeneggs/types/graphql';

const useRecipeForm = () => useForm<RecipeInput, addRecipe, addRecipeVariables>(Mutations.ADD_RECIPE, 'recipe', {
  update: (cache, { data }) => {
    cache.modify({
      fields: {
        recipes(existingRecipes = []) {
          const newObject = cache.writeFragment({
            data: data?.addRecipe.data,
            fragment: Fragments.RecipeFragment,
            fragmentName: 'RecipeFragment',
          });
          return [...existingRecipes, newObject];
        },
      },
    });
  },
});

export default useRecipeForm;
