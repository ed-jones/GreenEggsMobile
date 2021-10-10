import React from "react";
import { Button } from "@ui-kitten/components";
import { ControlledInput, InputType, Rules } from "@greeneggs/ui";
import { AllergyInput } from "@greeneggs/types/graphql";
import CreateRecipePartTemplate, {
  RecipeFormPart,
} from "../create-recipe-part-template";
import { useForm } from "react-hook-form";
import { AddRecipeStyles } from "../add-recipe-styles";

export const CreateAllergy = ({ navigation, route }: any) => (
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
        ADD ALLERGY
      </Button>
    </>
  );
};
