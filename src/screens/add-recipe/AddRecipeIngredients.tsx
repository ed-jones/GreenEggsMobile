import React from "react";
import { Divider, Input, List, ListItem, Text } from "@ui-kitten/components";
import { Control, Controller } from "react-hook-form";
import {
  addRecipe,
  addRecipeVariables,
  RecipeInput,
} from "@greeneggs/types/graphql";
import ControlledInput, {
  InputType,
} from "@greeneggs/core/controlled-input/ControlledInput";
import { IForm } from "@greeneggs/core";

const Ingredients = [
  {
    title: "Carrot",
    description: "Finely chopped",
    quantity: "5 cups",
  },
  {
    title: "Baked Beans",
    quantity: "1 Tin",
  },
];

interface ICreateRecipeIngredients {
  form: IForm<RecipeInput, addRecipe, addRecipeVariables>;
}

const CreateRecipeIngredients = ({ form }: ICreateRecipeIngredients) => (
  <>
    <ControlledInput<RecipeInput>
      controllerProps={{ name: "servingCount", control: form.control }}
      inputProps={{ label: "SERVES", placeholder: "4 people", autoFocus: true }}
      submitError={!!form.formResult.data?.addRecipe.error}
      type={InputType.TEXT}
    />
    <Text category="h6">Ingredients</Text>
    <List
      data={Ingredients}
      renderItem={({ item }) => (
        <>
          <ListItem title={item.title} description={item.description} />
          <Divider />
        </>
      )}
    />
    <ListItem title="Add Ingredient" />
  </>
);

export default CreateRecipeIngredients;
