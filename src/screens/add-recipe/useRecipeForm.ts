import { Fragments, Mutations, useForm } from '@greeneggs/core';
import { addRecipe, addRecipeVariables, RecipeInput } from '@greeneggs/types/graphql';

const EmptyRecipeForm: addRecipeVariables = {
  recipe: {
    title: '',
    subtitle: '',
    description: '',
    servingCount: 0,
    timeEstimate: '',
    previewURI: '',
  }
}

const useRecipeForm = () => useForm<RecipeInput, addRecipe, addRecipeVariables>(Mutations.LOGIN, 'recioe', {
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
