import React from "react";
import { Button } from "@ui-kitten/components";
import {
  ControlledInput,
  InputType,
  partialValidate,
  Rules,
} from "@greeneggs/core";
import { RecipeInput } from "@greeneggs/types/graphql";
import CreateRecipePartTemplate, {
  RecipeFormPart,
} from "../CreateRecipePartTemplate";
import { addRecipeStyles } from "../AddRecipe";

const CreateAllergy = ({ navigation, route }: any) => (
  <CreateRecipePartTemplate
    title="Create Ingredient"
    navigation={navigation}
    route={route}
    formComponent={CreateAllergyForm}
  />
);

const CreateAllergyForm = ({ form, index, navigation }: RecipeFormPart) => (
  <>
    <ControlledInput<RecipeInput>
      controllerProps={{
        name: `allergies.${index}.name`,
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
      submitError={form.formResult.data?.addRecipe.error}
      type={InputType.TEXT}
    />
    <Button
      onPress={() =>
        partialValidate({
          form,
          validate: [`allergies.${index}.name`],
          register: `allergies.${index}`,
          onValid: () => navigation.goBack(),
        })
      }
    >
      ADD ALLERGY
    </Button>
  </>
);

export default CreateAllergy;
