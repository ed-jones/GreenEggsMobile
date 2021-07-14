import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Button, Spinner, withStyles } from "@ui-kitten/components";
import {
  addRecipe,
  addRecipeVariables,
  RecipeInput,
} from "@greeneggs/types/graphql";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icons, IForm, partialValidate, Rules } from "@greeneggs/core";

import useRecipeForm from "./useRecipeForm";
import AddRecipeIngredients from "./add-recipe-ingredients/AddRecipeIngredients";
import AddRecipeDirections from "./add-recipe-directions/AddRecipeDirections";
import AddRecipeCategories from "./add-recipe-categories/AddRecipeCategories";
import AddRecipeDetails from "./AddRecipeDetails";
import Stepper from "./Stepper";
import { useSteps, Step } from "./useSteps";
import PublishRecipe from "./PublishRecipe";

import AddRecipeAllergies from "./add-recipe-allergies/AddRecipeAllergies";
import AddRecipeDiets from "./add-recipe-diets/AddRecipeDiets";
import { useEffect } from "react";
import { useFieldArray } from "react-hook-form";

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
  input: {
    marginBottom: 10,
  },
});

export type RecipeForm = IForm<RecipeInput, addRecipe, addRecipeVariables>;

export default withStyles(function AddRecipe({ navigation, eva }: any) {
  const form = useRecipeForm();
  const Steps: Step[] = [
    {
      title: "Ingredients",
      component: <AddRecipeIngredients {...{ form, navigation }} />,
    },
    {
      title: "Directions",
      component: <AddRecipeDirections {...{ form, navigation }} />,
    },
    {
      title: "Categories",
      component: <AddRecipeCategories {...{ form, navigation }} />,
    },
    {
      title: "Allergies",
      component: <AddRecipeAllergies {...{ form, navigation }} />,
    },
    {
      title: "Diets",
      component: <AddRecipeDiets {...{ form, navigation }} />,
    },
    {
      title: "Details",
      component: <AddRecipeDetails {...{ form, navigation }} />,
    },
    {
      title: "Publish",
      component: <PublishRecipe {...{ form, navigation }} />,
    },
  ];
  const { remove } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const ingredientsLength = form.getValues("ingredients")?.length || 0;
  useEffect(() => {
    console.log(ingredientsLength);

    if (ingredientsLength > 0) {
      form.clearErrors("ingredients");
    }
  }, [ingredientsLength]);

  const steps = useSteps(Steps);
  const insets = useSafeAreaInsets();

  const onSubmit = async () => {
    console.log(form.getValues());
    try {
      const { data } = await form.submitForm();
      console.log(data);
      if (data?.addRecipe.error) {
        console.log(data?.addRecipe.error.message);
      } else {
        navigation.navigate("Recipe", { recipeId: data?.addRecipe.data?.id });
      }
    } catch (error) {
      console.log(error);
    }
  };

  function publish() {
    Alert.alert(
      "Publish recipe",
      "Are you sure you want to publish this recipe?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: () => form.handleSubmit(onSubmit) },
      ],
      { cancelable: false }
    );
  }

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
              onPress={publish}
              status="success"
              accessoryRight={
                form.formResult.loading
                  ? () => <Spinner size="small" status="control" />
                  : Icons.Publish
              }
            >
              PUBLISH
            </Button>
          ) : (
            <Button
              onPress={() => {
                if (ingredientsLength === 0) {
                  form.setError("ingredients", {
                    type: "required",
                    message: "You must add at least 1 ingredient",
                  });
                }
                form
                  .trigger()
                  .then((isValid) => (isValid ? steps.next() : undefined));
              }}
              accessoryRight={Icons.Forward}
            >
              NEXT
            </Button>
          )}
          {steps.isStart ? null : (
            <Button
              onPress={steps.previous}
              accessoryLeft={(props) => (
                <Icons.Back
                  {...props}
                  fill={eva?.theme && eva.theme["color-primary-500"]}
                />
              )}
              status="basic"
            >
              PREVIOUS
            </Button>
          )}
        </View>
      </View>
    </>
  );
});
