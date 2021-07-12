import React from "react";
import { Button } from "@ui-kitten/components";
import ControlledInput, {
  InputType,
  Rules,
} from "@greeneggs/core/controlled-input/ControlledInput";
import { RecipeInput } from "@greeneggs/types/graphql";
import CreateRecipePartTemplate, {
  RecipeFormPart,
} from "../CreateRecipePartTemplate";
import { addRecipeStyles } from "../AddRecipe";

const CreateDiet = ({ navigation, route }: any) => (
  <CreateRecipePartTemplate
    title="Create Diet"
    navigation={navigation}
    route={route}
    formComponent={CreateDietForm}
  />
);

const CreateDietForm = ({ form, index, navigation }: RecipeFormPart) => (
  <>
    <ControlledInput<RecipeInput>
      controllerProps={{
        name: `diets.${index}.name`,
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
        style: addRecipeStyles.input,
      }}
      submitError={form.formResult.data?.addRecipe.error}
      type={InputType.TEXT}
    />
    <Button
      onPress={() => {
        form.trigger([`diets.${index}.name`]).then((isValid) => {
          if (isValid) {
            form.register(`diets.${index}`, {
              value: form.getValues(`diets.${index}`),
            });
            navigation.goBack();
          }
        });
      }}
    >
      ADD DIET
    </Button>
  </>
);

export default CreateDiet;
