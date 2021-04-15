import React, { useState } from 'react';
import { Input, Button } from '@ui-kitten/components';
import { useMutation } from '@apollo/client';
import { View, ToastAndroid } from 'react-native';

import { RecipeInput, addRecipe, addRecipeVariables } from '../types/graphql'
import { ADD_RECIPE } from '../graphql/mutations';
import { RecipeFragment } from '../graphql/fragments';

const EmptyRecipeInput: RecipeInput = {
  title: '',
  description: '',
  servingCount: 0,
  timeEstimate: '',
  previewURI: '',
}

export default function AddRecipeScreen() {
  const [state, setState] = useState<RecipeInput>(EmptyRecipeInput);
  const showToast = () => {
    ToastAndroid.show('Recipe Submitted', ToastAndroid.SHORT);
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
      showToast();
    },
    variables: { recipe: state },
  });

  return (
    <View style={{padding: 16}}>
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
