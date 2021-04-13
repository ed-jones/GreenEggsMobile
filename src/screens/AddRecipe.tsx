import React, { useState } from 'react';
import { TopNavigation, Input, Button } from '@ui-kitten/components';
import { gql, useMutation } from '@apollo/client';

import { ADD_RECIPE } from '../graphql/mutations';

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
