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
    <Callout
      type="info"
      message="Add details such as a title, subtitle, description, time estimate and cover photo."
    />
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
        placeholder: "Spaghetti Carbonara",
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
        placeholder: "A quick, healthy and delicious meal",
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
          "When I was a little girl growing up in the mountains of Italy...",
        defaultValue: "",
        style: AddRecipeStyles.input,
      }}
      submitError={form.formResult.data?.addRecipe.error}
      type={InputType.TEXTAREA}
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
