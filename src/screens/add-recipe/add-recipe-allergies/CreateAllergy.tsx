import React from "react";
import { Button } from "@ui-kitten/components";
import {
  ControlledInput,
  InputType,
  partialValidate,
  Rules,
} from "@greeneggs/core";
import { AllergyInput, RecipeInput } from "@greeneggs/types/graphql";
import CreateRecipePartTemplate, {
  RecipeFormPart,
} from "../CreateRecipePartTemplate";
import { addRecipeStyles } from "../AddRecipe";
import { useForm } from "react-hook-form";

const CreateAllergy = ({ navigation, route }: any) => (
  <CreateRecipePartTemplate
    title="Create Ingredient"
    navigation={navigation}
    route={route}
    formComponent={CreateAllergyForm}
  />
);

const CreateAllergyForm = ({ append, navigation }: RecipeFormPart) => {
  const form = useForm<AllergyInput>({ mode: "all" });

  return (
    <>
      <ControlledInput<AllergyInput>
        controllerProps={{
          name: `name`,
          control: form.control,
          rules: {
            ...Rules.UNDER100CHARS,
            ...Rules.REQUIRED,
          },
        }}
        inputProps={{
          label: "ALLERGY",
          placeholder: "Dairy",
          defaultValue: "",
          style: addRecipeStyles.input,
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
        ADD ALLERGY
      </Button>
    </>
  );
};

export default CreateAllergy;
