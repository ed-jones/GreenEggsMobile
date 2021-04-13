import React, { useState } from 'react';
import { TopNavigation, Input, Button } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { gql, useMutation } from '@apollo/client';

const ADD_RECIPE = gql`
  mutation addRecipe($recipe: AddRecipeInput!) {
    addRecipe(recipe: $recipe) {
      data {
        title
        description
      }
    }
  }
`;

export default function AddRecipeScreen() {
  const [state, setState] = useState({
    title: '',
    description: '',
  });

  const [addRecipe] = useMutation(ADD_RECIPE, {
    onCompleted: () => {
      setState({
        title: '',
        description: '',
      });
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
      <Button onPress={() => addRecipe()}>
        Add Recipe
      </Button>
    </>
  );
}
