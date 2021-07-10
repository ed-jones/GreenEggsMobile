import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Button,
  Input,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icons } from "@greeneggs/core";
import ControlledInput, {
  InputType,
  Rules,
} from "@greeneggs/core/controlled-input/ControlledInput";
import { IngredientInput, RecipeInput } from "@greeneggs/types/graphql";
import { RecipeForm } from "../AddRecipe";

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 16,
  },
});

const CreateIngredient = ({ navigation, route }: any) => {
  const { form, index } = route.params as { form: RecipeForm; index: number };

  const insets = useSafeAreaInsets();
  return (
    <View style={styles.view}>
      <TopNavigation
        style={{ backgroundColor: "transparent", paddingTop: insets.top }}
        alignment="center"
        title="Add Ingredient"
        accessoryLeft={() => (
          <TopNavigationAction
            icon={Icons.Back}
            onPress={() => navigation.goBack()}
          />
        )}
      />
      <ControlledInput<RecipeInput>
        controllerProps={{
          name: `ingredients.${index}.name`,
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
        }}
        submitError={form.formResult.data?.addRecipe.error}
        type={InputType.TEXT}
      />
      <ControlledInput<RecipeInput>
        controllerProps={{
          name: `ingredients.${index}.description`,
          control: form.control,
          rules: {
            ...Rules.UNDER100CHARS,
          },
        }}
        inputProps={{
          label: "DESCRIPTION (OPTIONAL)",
          placeholder: "Finely chopped",
          defaultValue: "",
        }}
        submitError={form.formResult.data?.addRecipe.error}
        type={InputType.TEXT}
      />
      <ControlledInput<RecipeInput>
        controllerProps={{
          name: `ingredients.${index}.quantity`,
          control: form.control,
          rules: {
            ...Rules.REQUIRED,
          },
        }}
        inputProps={{
          label: "QUANTITY",
          placeholder: "5",
          defaultValue: "",
        }}
        submitError={form.formResult.data?.addRecipe.error}
        type={InputType.NUMERIC}
      />
      <ControlledInput<RecipeInput>
        controllerProps={{
          name: `ingredients.${index}.unit`,
          control: form.control,
          rules: {
            ...Rules.UNDER100CHARS,
          },
        }}
        inputProps={{
          label: "UNIT (OPTIONAL)",
          placeholder: "Cups",
          defaultValue: "",
        }}
        submitError={form.formResult.data?.addRecipe.error}
        type={InputType.TEXT}
      />
      <Button
        onPress={() => {
          form
            .trigger([
              `ingredients.${index}.name`,
              `ingredients.${index}.description`,
              `ingredients.${index}.quantity`,
              `ingredients.${index}.unit`,
            ])
            .then((isValid) => (isValid ? navigation.goBack() : undefined));
        }}
      >
        ADD INGREDIENT
      </Button>
    </View>
  );
};

export default CreateIngredient;
