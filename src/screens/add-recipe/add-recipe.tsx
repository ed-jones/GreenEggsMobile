import React, { useContext } from "react";
import { View, Alert } from "react-native";
import {
  Button,
  Divider,
  Layout,
  Spinner,
  withStyles,
} from "@ui-kitten/components";
import {
  addRecipe,
  addRecipeVariables,
  RecipeInput,
} from "@greeneggs/types/graphql";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icons, IForm, Background } from "@greeneggs/ui";

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
import { AddRecipeContext } from "@greeneggs/providers";
import { LoadingScreen } from "../loading-screen";

export type RecipeForm = IForm<RecipeInput, addRecipe, addRecipeVariables>;

export const AddRecipe = withStyles(function AddRecipe({
  navigation,
  eva,
}: any) {
  const { form, steps } = useContext(AddRecipeContext);

  if (form === undefined || steps === undefined) {
    return <LoadingScreen />
  }

  const insets = useSafeAreaInsets();

  const onSubmit = async () => {
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
      <Layout
        level="1"
        style={{ ...AddRecipeStyles.view, marginTop: insets.top }}
      >
        <Stepper
          index={steps.index}
          length={steps.length}
          currentStep={steps.currentStep.title}
          nextStep={steps.nextStep?.title}
        />
      </Layout>
      <Divider />
      {steps.currentStep.component}
      <Divider />
      <Layout level="1" style={AddRecipeStyles.view}>
        <View style={AddRecipeStyles.buttonGroup}>
          {steps.isEnd ? (
            <Button
              size="small"
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
              size="small"
              onPress={() => {
                form.trigger().then((isValid) => {
                  if (isValid) steps.next();
                });
              }}
              accessoryRight={Icons.Forward}
            >
              NEXT
            </Button>
          )}
          {steps.isStart ? null : (
            <Button
              size="small"
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
      </Layout>
    </Background>
  );
});
