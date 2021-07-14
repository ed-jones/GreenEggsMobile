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

const CreateCategory = ({ navigation, route }: any) => (
  <CreateRecipePartTemplate
    title="Create Category"
    navigation={navigation}
    route={route}
    formComponent={CreateCategoryForm}
    name="categories"
  />
);

const CreateCategoryForm = ({ form, index, navigation }: RecipeFormPart) => (
  <>
    <ControlledInput<RecipeInput>
      controllerProps={{
        name: `categories.${index}.name`,
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
      submitError={form.formResult.data?.addRecipe.error}
      type={InputType.TEXT}
    />
    <Button
      onPress={() =>
        partialValidate({
          form,
          validate: `categories.${index}.name`,
          register: `categories.${index}`,
          onValid: () => navigation.goBack(),
        })
      }
    >
      ADD CATEGORY
    </Button>
  </>
);

export default CreateCategory;
