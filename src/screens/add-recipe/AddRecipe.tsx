import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Input,
  Button,
  TopNavigation,
  Layout,
  Spinner,
} from "@ui-kitten/components";

import useRecipeForm from "./useRecipeForm";
import { Icons, IForm, TimePicker } from "@greeneggs/core";
import AddRecipeIngredients from "./AddRecipeIngredients";
import AddRecipeDirections from "./AddRecipeDirections";
import AddRecipeCategories from "./AddRecipeCategories";
import AddRecipeDetails from "./AddRecipeDetails";
import Stepper from "./Stepper";
import { useSteps, Step } from "./useSteps";
import PublishRecipe from "./PublishRecipe";
import {
  addRecipe,
  addRecipeVariables,
  RecipeInput,
} from "@greeneggs/types/graphql";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const addRecipeStyles = StyleSheet.create({
  view: {
    padding: 16,
  },
  buttonGroup: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  heading: {
    paddingVertical: 16,
  },
});

export type RecipeForm = IForm<RecipeInput, addRecipe, addRecipeVariables>;

export default function AddRecipe({ navigation }: any) {
  const recipeForm = useRecipeForm();
  const Steps: Step[] = [
    {
      title: "Ingredients",
      component: <AddRecipeIngredients form={recipeForm} />,
    },
    {
      title: "Directions",
      component: <AddRecipeDirections form={recipeForm} />,
    },
    {
      title: "Categories",
      component: <AddRecipeCategories form={recipeForm} />,
    },
    { title: "Details", component: <AddRecipeDetails form={recipeForm} /> },
    { title: "Publish", component: <PublishRecipe form={recipeForm} /> },
  ];

  const steps = useSteps(Steps);
  const insets = useSafeAreaInsets();

  const onSubmit = async () => {
    const res = await recipeForm.submitForm().catch((e) => console.log(e));
    console.log(res);
    // console.log(res.errors);
    // console.log(res.data?.addRecipe.data);
    // console.log(res.data?.addRecipe.error?.message);
  };

  return (
    <>
      <View style={{ ...addRecipeStyles.view, marginTop: insets.top }}>
        <Stepper
          index={steps.index}
          length={steps.length}
          currentStep={steps.currentStep.title}
          nextStep={steps.nextStep?.title}
        />
      </View>
      {steps.currentStep.component}
      <View style={addRecipeStyles.view}>
        <View style={addRecipeStyles.buttonGroup}>
          {steps.isEnd ? (
            <Button
              onPress={recipeForm.handleSubmit(onSubmit)}
              accessoryRight={
                recipeForm.formResult.loading
                  ? () => <Spinner size="small" status="control" />
                  : Icons.Publish
              }
            >
              Publish
            </Button>
          ) : (
            <Button onPress={steps.next} accessoryRight={Icons.Forward}>
              Next
            </Button>
          )}
          {steps.isStart ? null : (
            <Button onPress={steps.previous} accessoryLeft={Icons.Back}>
              Previous
            </Button>
          )}
        </View>
      </View>
    </>
  );
}
