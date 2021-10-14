import React from "react";
import { RecipeInput } from "@greeneggs/types/graphql";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  ControlledInput,
  InputType,
  Rules,
  IngredientListItem,
} from "@greeneggs/ui";
import { useEffect } from "react";
import { useFieldArray } from "react-hook-form";
import { View } from "react-native";

import { AddRecipeStyles } from "../add-recipe-styles";
import { AddRecipePartTemplate } from "../add-recipe-part-template";
import { RecipeForm } from "../add-recipe";

interface ICreateRecipeIngredients {
  form: RecipeForm;
  navigation: StackNavigationProp<any>;
}

export const AddRecipeIngredients = ({
  form,
  navigation,
}: ICreateRecipeIngredients) => {
  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const ingredientsLength = fields?.length || 0;
  useEffect(() => {
    if (ingredientsLength > 0) {
      form.clearErrors("ingredients");
    }
  }, [ingredientsLength]);

  return (
    <AddRecipePartTemplate
      title="Ingredients"
      createButtonTitle="ADD INGREDIENT"
      onPressCreate={() =>
        navigation.navigate("CreateIngredient", {
          append,
        })
      }
      emptyStateTitle="No ingredients"
      emptyStateDescription="Make sure to add any ingredients this recipe might need."
      header={
        <View style={{ flexDirection: "row" }}>
          <ControlledInput<RecipeInput>
            controllerProps={{
              name: "servingCount",
              control: form.control,
              rules: {
                ...Rules.REQUIRED,
                max: {
                  value: 99,
                  message: "Serving count must be below 100 ",
                },
              },
            }}
            inputProps={{
              // textAlign: "right",
              label: "SERVES",
              placeholder: "4 people",
              defaultValue: "",
              style: {
                ...AddRecipeStyles.input,
                paddingHorizontal: 16,
                width: "100%",
              },
            }}
            submitError={form.formResult.data?.addRecipe.error}
            type={InputType.NUMERIC}
          />
        </View>
      }
      listItem={({ item, index }) =>
        item && (
          <IngredientListItem
            ingredient={{ ...item, __typename: "Ingredient" }}
            remove={() => remove(index)}
          />
        )
      }
      data={fields}
    />
  );
};
