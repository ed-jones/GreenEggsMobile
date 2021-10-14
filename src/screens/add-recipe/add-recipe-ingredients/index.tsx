import React from "react";
import { List, Text } from "@ui-kitten/components";
import { ScrollView, View } from "react-native";
import { RecipeInput } from "@greeneggs/types/graphql";
import { RecipeForm } from "../add-recipe";
import { StackNavigationProp } from "@react-navigation/stack";
import { Callout, AddListItem, ControlledInput, InputType, Rules, IngredientListItem } from "@greeneggs/ui";
import { useEffect } from "react";
import { FieldError, useFieldArray } from "react-hook-form";
import { AddRecipeStyles } from "../add-recipe-styles";

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
    <ScrollView>
      <Callout
        type="info"
        message="Include ingredients needed to make this recipe."
        style={AddRecipeStyles.view}
      />
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

      <Text
        category="h5"
        style={{ ...AddRecipeStyles.heading, ...AddRecipeStyles.view }}
      >
        Ingredients
      </Text>
      <List
        data={fields}
        renderItem={({ item, index }) =>
          item && (
            <IngredientListItem
              ingredient={{ ...item, __typename: "Ingredient" }}
              remove={() => remove(index)}
            />
          )
        }
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
            append,
          })
        }
      />
    </ScrollView>
  );
};
