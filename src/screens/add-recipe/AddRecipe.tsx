import React from 'react';
import { View } from 'react-native';
import { Input, Button } from '@ui-kitten/components';

import useRecipeForm from './useRecipeForm';

export default function AddRecipe() {
  const [recipeForm, setRecipeForm, submitRecipeForm] = useRecipeForm();

  return (
    <View style={{ padding: 16 }}>
      <Input
        label="Title"
        placeholder="Greek Salad"
        value={recipeForm.title}
        onChangeText={(nextValue) => setRecipeForm('title', nextValue)}
      />
      <Input
        label="Description"
        placeholder="A popular salad in Greek cuisine."
        value={recipeForm.description}
        onChangeText={(nextValue) => setRecipeForm('description', nextValue)}
      />
      <Input
        label="Serves"
        placeholder="4"
        value={String(recipeForm.servingCount)}
        onChangeText={(nextValue) => setRecipeForm('servingCount', nextValue)}
      />
      <Input
        label="Time Estimate"
        placeholder="12000"
        value={recipeForm.timeEstimate}
        onChangeText={(nextValue) => setRecipeForm('timeEstimate', nextValue)}
      />
      <Input
        label="Image"
        placeholder="http://website.com/image.jpg"
        value={recipeForm.previewURI}
        onChangeText={(nextValue) => setRecipeForm('previewURI', nextValue)}
      />
      <Button onPress={submitRecipeForm}>
        Add Recipe
      </Button>
    </View>
  );
}
