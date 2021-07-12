import React from "react";
import { Divider, Input, List, ListItem, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native";
import { addRecipeStyles, RecipeForm } from "./AddRecipe";
import ControlledInput, {
  InputType,
  Rules,
} from "@greeneggs/core/controlled-input/ControlledInput";
import { RecipeInput } from "@greeneggs/types/graphql";
import Alert from "@greeneggs/core/alert/Alert";

interface IPublishRecipe {
  form: RecipeForm;
}

const PublishRecipe = ({ form }: IPublishRecipe) => (
  <ScrollView style={{ paddingHorizontal: 16 }}>
    <Alert
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
        placeholder: "PUBLIC",
        defaultValue: "",
        style: addRecipeStyles.input,
        caption: "Who is able to see your recipe?",
      }}
      submitError={form.formResult.data?.addRecipe.error}
      type={InputType.TEXT}
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
        placeholder: "PUBLIC",
        defaultValue: "",
        style: addRecipeStyles.input,
        caption: "Who is able to comment on your recipe?",
      }}
      submitError={form.formResult.data?.addRecipe.error}
      type={InputType.TEXT}
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
        placeholder: "PUBLIC",
        defaultValue: "",
        style: addRecipeStyles.input,
        caption: "Who is able to like your recipe?",
      }}
      submitError={form.formResult.data?.addRecipe.error}
      type={InputType.TEXT}
    />
  </ScrollView>
);

export default PublishRecipe;
