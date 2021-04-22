import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { ToastAndroid } from 'react-native';
import { RecipeFragment } from '../../core/graphql/fragments';
import { ADD_RECIPE } from '../../core/graphql/mutations';

import { addRecipe, addRecipeVariables, RecipeInput } from '../../types/graphql';

const EmptyRecipeInput: RecipeInput = {
    title: '',
    description: '',
    servingCount: 0,
    timeEstimate: '',
    previewURI: '',
}

export type IRecipeForm = [
  state: RecipeInput,
  setState: (field: string, value: string) => void,
  addRecipeMutation: () => void,
]

export default function useRecipeForm(recipeInput: RecipeInput = EmptyRecipeInput): IRecipeForm {
    const [state, setState] = useState<RecipeInput>(recipeInput);

    const setRecipeFormField = (field: string, value: string) => {
      setState({ ...state, [field]: value });
    }
  
    const [addRecipeMutation] = useMutation<addRecipe, addRecipeVariables>(ADD_RECIPE, {
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            recipes(existingRecipes = []) {
              const newObject = cache.writeFragment({
                data: data?.addRecipe.data,
                fragment: RecipeFragment,
                fragmentName: 'RecipeFragment',
              });
              return [...existingRecipes, newObject];
            },
          },
        });
      },
      onCompleted: () => {
        setState(EmptyRecipeInput);
        ToastAndroid.show('Recipe Submitted', ToastAndroid.SHORT);
      },
      onError: () => {
        ToastAndroid.show('Error: Unable to submit recipe', ToastAndroid.SHORT);
      },
      variables: { recipe: state },
    });

    return [state, setRecipeFormField, addRecipeMutation];
}
