import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Button } from '@ui-kitten/components';

import useRecipeForm from './useRecipeForm';
import { TimePicker } from '@greeneggs/core';

function numberToString(number: number | null): string {
  if (number === NaN) {
    return '';
  }
  if (number === 0) {
    return '0';
  }
  if (number === null) {
    return '';
  }
  if (String(number) === "NaN") {
    return '';
  }
  return String(number);
}

function stringToNumber(string: string): number | null {
  if (string === '') {
    return null;
  }
  if (Number(string) == NaN) {
    return 0;
  }
  return Number(string);
}

export default function AddRecipe() {
  const [recipeForm, setRecipeForm, submitRecipeForm] = useRecipeForm();
  const [timePickerOpen, setTimePickerOpen] = useState<boolean>(false);

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
        keyboardType="numeric"
        value={numberToString(recipeForm.servingCount)}
        onChangeText={(nextValue) => setRecipeForm('servingCount', stringToNumber(nextValue))}
      />
      <Button onPress={() => setTimePickerOpen(true)}>OPEN TIME PICKER</Button>
      <TimePicker />
      <Input
        label="Time Estimate"
        placeholder="12000"
        value={recipeForm.timeEstimate}
      />
      <Input
        label="Image"
        placeholder="http://website.com/image.jpg"
        value={recipeForm.previewURI}
        onChangeText={(nextValue) => setRecipeForm('previewURI', nextValue)}
      />
      <Button onPress={submitRecipeForm}>
        ADD RECIPE
      </Button>
    </View>
  );
}
