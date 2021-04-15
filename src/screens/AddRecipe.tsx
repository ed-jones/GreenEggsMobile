import React, { useState } from 'react';
import { TopNavigation, Input, Button } from '@ui-kitten/components';
import { useMutation } from '@apollo/client';

import { RecipeInput, addRecipe, addRecipeVariables } from '../types/graphql'
import { ADD_RECIPE } from '../graphql/mutations';
import { RecipeFragment } from '../graphql/fragments';
import { View } from 'react-native';

const EmptyRecipeInput: RecipeInput = {
  title: '',
  description: '',
  servingCount: 0,
  timeEstimate: '',
  previewURI: '',
}

export default function AddRecipeScreen() {
  const [state, setState] = useState<RecipeInput>(EmptyRecipeInput);

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
    },
    variables: { recipe: state },
  });

  return (
    <View>
      <TopNavigation
        title='Add Recipe'
      />
      <Input 
        label='Title'
        placeholder='Greek Salad'
        value={state.title}
        onChangeText={nextValue => setState({ ...state, title: nextValue })}
      />
      <Input 
        label='Description'
        placeholder='A popular salad in Greek cuisine.'
        value={state.description}
        onChangeText={nextValue => setState({ ...state, description: nextValue })}
      />
      <Input 
        label='Serves'
        placeholder='4'
        value={String(state.servingCount)}
        onChangeText={nextValue => setState({ ...state, servingCount: Number(nextValue) })}
      />
      <Input 
        label='Time Estimate'
        placeholder='12000'
        value={state.timeEstimate}
        onChangeText={nextValue => setState({ ...state, timeEstimate: nextValue })}
      />
      <Input 
        label='Image'
        placeholder='http://website.com/image.jpg'
        value={state.previewURI}
        onChangeText={nextValue => setState({ ...state, previewURI: nextValue })}
      />
      <Button onPress={() => addRecipeMutation()}>
        Add Recipe
      </Button>
    </View>
  );
}
