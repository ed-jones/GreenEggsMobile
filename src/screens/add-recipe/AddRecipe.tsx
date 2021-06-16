import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, TopNavigation } from '@ui-kitten/components';

import useRecipeForm from './useRecipeForm';
import { TimePicker } from '@greeneggs/core';
import AddRecipeIngredients from './AddRecipeIngredients';
import AddRecipeDirections from './AddRecipeDirections';
import AddRecipeCategories from './AddRecipeCategories';
import AddRecipeDetails from './AddRecipeDetails';
import Stepper from './Stepper';
import { useSteps, Step } from './useSteps';
import PublishRecipe from './PublishRecipe';

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


const styles = StyleSheet.create({
  view: {
    padding: 14
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default function AddRecipe() {
  // const [recipeForm, setRecipeForm, submitRecipeForm] = useRecipeForm();
  const Steps: Step[] = [
    {title: "Ingredients", component: <AddRecipeIngredients/>},
    {title: "Directions", component: <AddRecipeDirections/>},
    {title: "Categories", component: <AddRecipeCategories/>},
    {title: "Details", component: <AddRecipeDetails/>},
    {title: "Publish", component: <PublishRecipe/>},
  ];

  const [currentStep, nextStep, next, previous, isStart, isEnd, index, length] = useSteps(Steps);
  return (
    <>
      <TopNavigation title="Create Recipe" alignment="center"/>
      <View style={styles.view}>
        <Stepper index={index} length={length} currentStep={currentStep.title} nextStep={nextStep?.title}/>
        {currentStep.component}
        <View style={styles.buttonGroup}>
          {isStart ? null : <Button onPress={previous}>Previous</Button>}
          {isEnd ? null : <Button onPress={next}>Next</Button>}
        </View>
      </View>
    </>
  );
}


{/* <Input
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
  </Button> */}