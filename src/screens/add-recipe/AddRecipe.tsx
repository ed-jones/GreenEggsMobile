import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, TopNavigation } from "@ui-kitten/components";

import useRecipeForm from "./useRecipeForm";
import { TimePicker } from "@greeneggs/core";
import AddRecipeIngredients from "./AddRecipeIngredients";
import AddRecipeDirections from "./AddRecipeDirections";
import AddRecipeCategories from "./AddRecipeCategories";
import AddRecipeDetails from "./AddRecipeDetails";
import Stepper from "./Stepper";
import { useSteps, Step } from "./useSteps";
import PublishRecipe from "./PublishRecipe";

const styles = StyleSheet.create({
  view: {
    padding: 14,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default function AddRecipe() {
  const recipeForm = useRecipeForm();
  const Steps: Step[] = [
    {
      title: "Ingredients",
      component: <AddRecipeIngredients form={recipeForm} />,
    },
    { title: "Directions", component: <AddRecipeDirections /> },
    { title: "Categories", component: <AddRecipeCategories /> },
    { title: "Details", component: <AddRecipeDetails /> },
    { title: "Publish", component: <PublishRecipe /> },
  ];

  const steps = useSteps(Steps);

  return (
    <>
      <TopNavigation title="Create Recipe" alignment="center" />
      <View style={styles.view}>
        <Stepper
          index={steps.index}
          length={steps.length}
          currentStep={steps.currentStep.title}
          nextStep={steps.nextStep?.title}
        />
      </View>
      {steps.currentStep.component}
      <View style={styles.view}>
        <View style={styles.buttonGroup}>
          {steps.isStart ? null : (
            <Button onPress={steps.previous}>Previous</Button>
          )}
          {steps.isEnd ? (
            <Button onPress={recipeForm.handleSubmit(recipeForm.submitForm)}>
              Publish
            </Button>
          ) : (
            <Button onPress={steps.next}>Next</Button>
          )}
        </View>
      </View>
    </>
  );
}

{
  /* <Input
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
  </Button> */
}
