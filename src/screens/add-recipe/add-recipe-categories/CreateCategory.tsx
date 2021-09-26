import React from "react";
import { Button } from "@ui-kitten/components";
import {
  ControlledInput,
  InputType,
  partialValidate,
  Rules,
} from "@greeneggs/core";
import { CategoryInput, RecipeInput } from "@greeneggs/types/graphql";
import CreateRecipePartTemplate, {
  RecipeFormPart,
} from "../CreateRecipePartTemplate";
import { useForm } from "react-hook-form";
import addRecipeStyles from "../add-recipe-styles";

const CreateCategory = ({ navigation, route }: any) => (
  <CreateRecipePartTemplate
    title="Create Category"
    navigation={navigation}
    route={route}
    formComponent={CreateCategoryForm}
  />
);

const CreateCategoryForm = ({ append, navigation }: RecipeFormPart) => {
  const form = useForm<CategoryInput>({ mode: "all" });

  return (
    <>
      <ControlledInput<CategoryInput>
        controllerProps={{
          name: `name`,
          control: form.control,
          rules: {
            ...Rules.UNDER100CHARS,
            ...Rules.REQUIRED,
          },
        }}
        inputProps={{
          label: "CATEGORY",
          placeholder: "Breakfast",
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
        ADD CATEGORY
      </Button>
    </>
  );
};

export default CreateCategory;
