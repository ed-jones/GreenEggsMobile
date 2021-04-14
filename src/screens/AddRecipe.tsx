import React, { useState } from 'react';
import { TopNavigation, Input, Button } from '@ui-kitten/components';
import { useMutation } from '@apollo/client';

import { AddRecipeInput, addRecipe, addRecipeVariables } from '../types/graphql'
import { ADD_RECIPE } from '../graphql/mutations';
import { RecipeFragment } from '../graphql/fragments';

const EmptyRecipeInput: AddRecipeInput = {
  title: '',
  description: '',
}

export default function AddRecipeScreen() {
  const [state, setState] = useState<AddRecipeInput>(EmptyRecipeInput);

  const [addRecipeMutation] = useMutation<addRecipe, addRecipeVariables>(ADD_RECIPE, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          allRecipes(existingRecipes = []) {
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
    },
    variables: { recipe: state },
  });

  return (
    <>
      <TopNavigation
        title='Add Recipe'
      />
      <Input 
        label='Title'
        value={state.title}
        onChangeText={nextValue => setState({ ...state, title: nextValue })}
      />
      <Input 
        label='Description'
        value={state.description}
        onChangeText={nextValue => setState({ ...state, description: nextValue })}
      />
      <Button onPress={() => addRecipeMutation()}>
        Add Recipe
      </Button>
    </>
  );
}
