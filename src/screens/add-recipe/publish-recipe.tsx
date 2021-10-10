import React from "react";
import { ScrollView } from "react-native";
import { RecipeForm } from "./add-recipe";
import { ControlledInput, InputType, Rules, Callout } from "@greeneggs/ui";
import { RecipeInput } from "@greeneggs/types/graphql";
import addRecipeStyles from "./add-recipe-styles";

interface IPublishRecipe {
  form: RecipeForm;
}

const PublishRecipe = ({ form }: IPublishRecipe) => (
  <ScrollView style={{ paddingHorizontal: 16 }}>
    <Callout
      type="warning"
      message="Control who is able to see, like and comment on your recipe."
    />
    <ControlledInput<RecipeInput>
      controllerProps={{
        name: `visibility`,
        control: form.control,
        rules: {
          ...Rules.REQUIRED,
        },
      }}
      inputProps={{
        label: "RECIPE PRIVACY",
        defaultValue: "",
        style: addRecipeStyles.input,
        caption: "Who is able to see your recipe?",
      }}
      submitError={form.formResult.data?.addRecipe.error}
      type={InputType.PRIVACY}
    />
    <ControlledInput<RecipeInput>
      controllerProps={{
        name: `commentability`,
        control: form.control,
        rules: {
          ...Rules.REQUIRED,
        },
      }}
      inputProps={{
        label: "COMMENT PRIVILEGES",
        defaultValue: "",
        style: addRecipeStyles.input,
        caption: "Who is able to comment on your recipe?",
      }}
      submitError={form.formResult.data?.addRecipe.error}
      type={InputType.PRIVACY}
    />
    <ControlledInput<RecipeInput>
      controllerProps={{
        name: `likeability`,
        control: form.control,
        rules: {
          ...Rules.REQUIRED,
        },
      }}
      inputProps={{
        label: "LIKE PRIVILEGES",
        defaultValue: "",
        style: addRecipeStyles.input,
        caption: "Who is able to like your recipe?",
      }}
      submitError={form.formResult.data?.addRecipe.error}
      type={InputType.PRIVACY}
    />
  </ScrollView>
);

export default PublishRecipe;
