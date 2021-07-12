import React from "react";
import { Divider, Input, List, ListItem, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native";
import { addRecipeStyles, RecipeForm } from "./AddRecipe";
import ControlledInput, {
  InputType,
  Rules,
} from "@greeneggs/core/controlled-input/ControlledInput";
import { RecipeInput } from "@greeneggs/types/graphql";

interface IPublishRecipe {
  form: RecipeForm;
}

const PublishRecipe = ({ form }: IPublishRecipe) => (
  <ScrollView style={addRecipeStyles.view}>
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
      }}
      submitError={form.formResult.data?.addRecipe.error}
      type={InputType.TEXT}
    />
  </ScrollView>
);

export default PublishRecipe;
