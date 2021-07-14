import React from "react";
import { Button, List, Text } from "@ui-kitten/components";
import { ScrollView, View } from "react-native";
import {
  RecipeInput,
  recipe_recipe_data_ingredients,
} from "@greeneggs/types/graphql";
import { ControlledInput, InputType, Rules } from "@greeneggs/core";
import { addRecipeStyles, RecipeForm } from "../AddRecipe";
import AddListItem from "@greeneggs/core/add-list-item/AddListItem";
import IngredientListItem from "@greeneggs/core/ingredient-list-item/IngredientListItem";
import { StackNavigationProp } from "@react-navigation/stack";
import Alert from "@greeneggs/core/alert/Alert";
import { useEffect } from "react";
import { Controller, FieldError, useFieldArray } from "react-hook-form";

interface ICreateRecipeIngredients {
  form: RecipeForm;
  navigation: StackNavigationProp<any>;
}

const CreateRecipeIngredients = ({
  form,
  navigation,
}: ICreateRecipeIngredients) => {
  const { fields, remove } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const index = form.getValues("ingredients")?.length || 0;

  return (
    <ScrollView>
      <Alert
        type="info"
        message="Include ingredients needed to make this recipe."
        style={addRecipeStyles.view}
      />
      <ControlledInput<RecipeInput>
        controllerProps={{
          name: "servingCount",
          control: form.control,
          rules: {
            ...Rules.REQUIRED,
          },
        }}
        inputProps={{
          label: "SERVES",
          placeholder: "4",
          defaultValue: "",
          caption: "How many people can this recipe serve?",
          style: {
            ...addRecipeStyles.input,
            paddingHorizontal: 16,
          },
        }}
        submitError={form.formResult.data?.addRecipe.error}
        type={InputType.NUMERIC}
      />
      <Text
        category="h5"
        style={{ ...addRecipeStyles.heading, ...addRecipeStyles.view }}
      >
        Ingredients
      </Text>
      <List
        data={form.watch("ingredients")}
        renderItem={({ item, index }) => (
          <IngredientListItem ingredient={item} remove={() => remove(index)} />
        )}
      />
      <AddListItem
        error={
          (form.formState.errors.ingredients as unknown as FieldError)?.message
            ? (form.formState.errors.ingredients as unknown as FieldError)
            : undefined
        }
        label={`ADD INGREDIENT`}
        onPress={() =>
          navigation.navigate("CreateIngredient", {
            form,
            index,
          })
        }
      />
    </ScrollView>
  );
};

export default CreateRecipeIngredients;
