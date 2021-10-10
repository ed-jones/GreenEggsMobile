import React from "react";
import { Button } from "@ui-kitten/components";
import {
  ControlledInput,
  InputType,
  Rules,
} from "@greeneggs/ui";
import { CategoryInput } from "@greeneggs/types/graphql";
import { useForm } from "react-hook-form";

import CreateRecipePartTemplate, {
  RecipeFormPart,
} from "../create-recipe-part-template";
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
