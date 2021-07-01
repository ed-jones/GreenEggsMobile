import React from "react";
import { Divider, Input, List, ListItem, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import {
  addRecipe,
  addRecipeVariables,
  RecipeInput,
} from "@greeneggs/types/graphql";
import ControlledInput, {
  InputType,
} from "@greeneggs/core/controlled-input/ControlledInput";
import { IForm } from "@greeneggs/core";
import { ScrollView } from "react-native-gesture-handler";
import { addRecipeStyles, RecipeForm } from "./AddRecipe";

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
  form: RecipeForm;
}

const CreateRecipeIngredients = ({ form }: ICreateRecipeIngredients) => (
  <ScrollView>
    <View style={addRecipeStyles.view}>
      <ControlledInput<RecipeInput>
        controllerProps={{ name: "servingCount", control: form.control }}
        inputProps={{
          label: "SERVES",
          placeholder: "4",
          defaultValue: "",
        }}
        submitError={form.formResult.data?.addRecipe.error}
        type={InputType.NUMERIC}
      />
      <Text category="h5" style={addRecipeStyles.heading}>
        Ingredients
      </Text>
    </View>
    <List
      data={Ingredients}
      renderItem={({ item }) => (
        <>
          <ListItem
            title={item.title}
            description={item.description}
            accessoryRight={() => (
              <Text category="label">{item.quantity.toUpperCase()}</Text>
            )}
          />
        </>
      )}
    />
    <ListItem title="Add Ingredient" />
  </ScrollView>
);

export default CreateRecipeIngredients;
