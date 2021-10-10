import React from "react";
import { Button } from "@ui-kitten/components";
import { ControlledInput, InputType, Rules } from "@greeneggs/ui";
import { DietInput } from "@greeneggs/types/graphql";
import {
  CreateRecipePartTemplate,
  RecipeFormPart,
} from "../create-recipe-part-template";
import { useForm } from "react-hook-form";
import { AddRecipeStyles } from "../add-recipe-styles";

export const CreateDiet = ({ navigation, route }: any) => (
  <CreateRecipePartTemplate
    title="Create Diet"
    navigation={navigation}
    route={route}
    formComponent={CreateDietForm}
  />
);

const CreateDietForm = ({ append, navigation }: RecipeFormPart) => {
  const form = useForm<DietInput>({ mode: "all" });

  return (
    <>
      <ControlledInput<DietInput>
        controllerProps={{
          name: `name`,
          control: form.control,
          rules: {
            ...Rules.UNDER100CHARS,
            ...Rules.REQUIRED,
          },
        }}
        inputProps={{
          label: "DIET",
          placeholder: "Vegetarian",
          defaultValue: "",
          style: AddRecipeStyles.input,
        }}
        type={InputType.TEXT}
      />
      <Button
        onPress={() => {
          form.trigger("name").then((isValid) => {
            if (isValid) {
              append(form.getValues());
              navigation.goBack();
            }
          });
        }}
      >
        ADD DIET
      </Button>
    </>
  );
};
