import React from "react";
import { Button } from "@ui-kitten/components";
import { ControlledInput, InputType, Rules } from "@greeneggs/core";
import { IngredientInput } from "@greeneggs/types/graphql";
import { addRecipeStyles } from "../AddRecipe";
import CreateRecipePartTemplate, {
  RecipeFormPart,
} from "../CreateRecipePartTemplate";
import { useForm } from "react-hook-form";
import { View } from "react-native";

const CreateIngredient = ({ navigation, route }: any) => (
  <CreateRecipePartTemplate
    title="Create Ingredient"
    navigation={navigation}
    route={route}
    formComponent={CreateIngredientForm}
  />
);

const CreateIngredientForm = ({ navigation, append }: RecipeFormPart) => {
  const form = useForm<IngredientInput>({ mode: "all" });

  return (
    <>
      <ControlledInput<IngredientInput>
        controllerProps={{
          shouldUnregister: true,
          name: `name`,
          control: form.control,
          rules: {
            ...Rules.REQUIRED,
            ...Rules.UNDER100CHARS,
          },
        }}
        inputProps={{
          label: "INGREDIENT NAME",
          placeholder: "Carrot",
          defaultValue: "",
          style: addRecipeStyles.input,
        }}
        type={InputType.TEXT}
      />
      <ControlledInput<IngredientInput>
        controllerProps={{
          shouldUnregister: true,
          name: `description`,
          control: form.control,
          rules: {
            ...Rules.UNDER100CHARS,
          },
        }}
        inputProps={{
          label: "DESCRIPTION (OPTIONAL)",
          placeholder: "Finely chopped",
          defaultValue: "",
          style: addRecipeStyles.input,
        }}
        type={InputType.TEXT}
      />
      <View style={{ flexDirection: "row" }}>
      <ControlledInput<IngredientInput>
          controllerProps={{
            shouldUnregister: true,
            name: `quantity`,
            control: form.control,
            rules: {
              ...Rules.REQUIRED,
              max: {
                value: 999,
                message: "Must be under 1000",
              },
            },
          }}
          inputProps={{
            label: "QUANTITY",
            placeholder: "5",
            defaultValue: "",
            style: { width: "30%", ...addRecipeStyles.input },
          }}
          type={InputType.NUMERIC}
        />
        <ControlledInput<IngredientInput>
          controllerProps={{
            shouldUnregister: true,
            name: `unit`,
            control: form.control,
            rules: {
              ...Rules.UNDER100CHARS,
            },
          }}
          inputProps={{
            label: "UNIT (OPTIONAL)",
            placeholder: "Cups",
            defaultValue: "",
            style: { width: "70%", ...addRecipeStyles.input },
          }}
          type={InputType.TEXT}
        />
      </View>
      <Button
        onPress={() => {
          form
            .trigger([`name`, `description`, `quantity`, `unit`])
            .then((isValid) => {
              if (isValid) {
                append(form.getValues());
                navigation.goBack();
              }
            });
        }}
      >
        ADD INGREDIENT
      </Button>
    </>
  );
};

export default CreateIngredient;
