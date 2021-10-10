import React from "react";
import { View, Alert } from "react-native";
import { Button, Spinner, withStyles } from "@ui-kitten/components";
import {
  addRecipe,
  addRecipeVariables,
  RecipeInput,
} from "@greeneggs/types/graphql";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icons, IForm, Background } from "@greeneggs/ui";

import { useRecipeForm } from "./use-recipe-form";
import { AddRecipeIngredients } from "./add-recipe-ingredients";
import { AddRecipeDirections } from "./add-recipe-directions";
import { AddRecipeCategories } from "./add-recipe-categories";
import { AddRecipeDetails } from "./add-recipe-details";
import { Stepper } from "./stepper";
import { useSteps, Step } from "./use-steps";
import { PublishRecipe } from "./publish-recipe";

import { AddRecipeAllergies } from "./add-recipe-allergies";
import { AddRecipeDiets } from "./add-recipe-diets";
import { AddRecipeStyles } from "./add-recipe-styles";

export type RecipeForm = IForm<RecipeInput, addRecipe, addRecipeVariables>;

export const AddRecipe = withStyles(function AddRecipe({ navigation, eva }: any) {
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
      title: "Privacy",
      component: <PublishRecipe {...{ form, navigation }} />,
    },
  ];

  const steps = useSteps(Steps);
  const insets = useSafeAreaInsets();

  const onSubmit = async () => {
    console.log(form.getValues());
    try {
      const { data } = await form.submitForm();
      if (data?.addRecipe.error) {
      } else {
        form.reset();
        steps.reset();
        navigation.push("Recipe", { recipeId: data?.addRecipe.data?.id });
      }
    } catch (error) {
      console.error(error);
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
        { text: "OK", onPress: () => onSubmit() },
      ],
      { cancelable: false }
    );
  }

  return (
    <Background>
      <View style={{ ...AddRecipeStyles.view, marginTop: insets.top }}>
        <Stepper
          index={steps.index}
          length={steps.length}
          currentStep={steps.currentStep.title}
          nextStep={steps.nextStep?.title}
        />
      </View>
      {steps.currentStep.component}
      <View style={AddRecipeStyles.view}>
        <View style={AddRecipeStyles.buttonGroup}>
          {steps.isEnd ? (
            <Button
              onPress={() => {
                form.trigger().then((isValid) => {
                  if (isValid) {
                    publish();
                  }
                });
              }}
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
                // Manual form validation for ingredients list
                // Make sure that there is at least 1 ingreident
                if (!form.getValues("ingredients")?.length) {
                  form.setError("ingredients", {
                    type: "required",
                    message: "You must add at least 1 ingredient",
                  });
                }

                // if (!form.getValues("steps")?.length) {
                //   form.setError("steps", {
                //     type: "required",
                //     message: "You must add at least 1 step",
                //   });
                // }
                form.trigger().then((isValid) => {
                  if (isValid) steps.next();
                });
              }}
              accessoryRight={Icons.Forward}
            >
              {steps.nextStep?.title.toUpperCase()}
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
              {steps.lastStep?.title.toUpperCase()}
            </Button>
          )}
        </View>
      </View>
    </Background>
  );
});
