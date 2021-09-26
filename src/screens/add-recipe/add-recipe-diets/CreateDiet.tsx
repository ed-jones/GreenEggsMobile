import React from "react";
import { Button } from "@ui-kitten/components";
import { ControlledInput, InputType, Rules } from "@greeneggs/core";
import { DietInput } from "@greeneggs/types/graphql";
import CreateRecipePartTemplate, {
  RecipeFormPart,
} from "../CreateRecipePartTemplate";
import { useForm } from "react-hook-form";
import addRecipeStyles from "../add-recipe-styles";

const CreateDiet = ({ navigation, route }: any) => (
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
        ADD DIET
      </Button>
    </>
  );
};

export default CreateDiet;
