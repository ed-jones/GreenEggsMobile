import React from "react";
import { Text } from "@ui-kitten/components";
import { ScrollView } from "react-native";
import { InputType, Rules, ControlledInput, Callout } from "@greeneggs/ui";
import { RecipeInput } from "@greeneggs/types/graphql";
import { RecipeForm } from "./add-recipe";
import { AddRecipeStyles } from "./add-recipe-styles";

interface ICreateRecipeDetails {
  form: RecipeForm;
}

export const AddRecipeDetails = ({ form }: ICreateRecipeDetails) => (
  <ScrollView style={{ paddingHorizontal: 16 }}>
    <Text category="h5" style={AddRecipeStyles.heading}>
      Details
    </Text>
    <ControlledInput<RecipeInput>
      controllerProps={{
        name: "title",
        control: form.control,
        rules: {
          ...Rules.REQUIRED,
        },
      }}
      inputProps={{
        label: "TITLE",
        placeholder: "Name of your recipe",
        defaultValue: "",
        style: AddRecipeStyles.input,
      }}
      submitError={form.formResult.data?.addRecipe.error}
      type={InputType.TEXT}
    />
    <ControlledInput<RecipeInput>
      controllerProps={{
        name: "subtitle",
        control: form.control,
        rules: {
          ...Rules.REQUIRED,
        },
      }}
      inputProps={{
        label: "SUBTITLE",
        placeholder: "Describe your recipe in one sentence",
        defaultValue: "",
        style: AddRecipeStyles.input,
      }}
      submitError={form.formResult.data?.addRecipe.error}
      type={InputType.TEXT}
    />
    <ControlledInput<RecipeInput>
      controllerProps={{
        name: "description",
        control: form.control,
        rules: {
          ...Rules.REQUIRED,
        },
      }}
      inputProps={{
        label: "DESCRIPTION",
        placeholder:
          "Tell us a little about yourself and your recipe",
        defaultValue: "",
        style: AddRecipeStyles.input,
      }}
      submitError={form.formResult.data?.addRecipe.error}
      type={InputType.TEXTAREA}
    />
    <ControlledInput<RecipeInput>
      controllerProps={{
        name: "servingCount",
        control: form.control,
        rules: {
          ...Rules.REQUIRED,
          max: {
            value: 99,
            message: "Serving count must be below 100 ",
          },
        },
      }}
      inputProps={{
        label: "SERVES",
        placeholder: "How many people does your recipe serve?",
        defaultValue: "",
        style: AddRecipeStyles.input,
      }}
      submitError={form.formResult.data?.addRecipe.error}
      type={InputType.NUMERIC}
    />
    <ControlledInput<RecipeInput>
      controllerProps={{
        name: "timeEstimate",
        control: form.control,
        rules: {
          ...Rules.REQUIRED,
        },
      }}
      inputProps={{
        label: "TIME ESTIMATE",
        placeholder: "5 hours",
        defaultValue: "",
        style: AddRecipeStyles.input,
        caption: "How long does it take to make this recipe?",
      }}
      submitError={form.formResult.data?.addRecipe.error}
      type={InputType.TIME}
    />
    <ControlledInput<RecipeInput>
      controllerProps={{
        name: "coverImage",
        control: form.control,
        rules: {
          ...Rules.REQUIRED,
        },
      }}
      inputProps={{ label: "COVER IMAGE " }}
      submitError={form.formResult.data?.addRecipe.error}
      type={InputType.PHOTO}
    />
  </ScrollView>
);
