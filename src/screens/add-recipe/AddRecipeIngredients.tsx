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
import AddListItem from "@greeneggs/core/add-list-item/AddListItem";
import IngredientListItem, {
  IIngredient,
} from "@greeneggs/core/ingredient-list-item/IngredientListItem";

const Ingredients: IIngredient[] = [
  {
    name: "Carrot",
    descriptor: "Finely chopped",
    quantity: 5,
    unit: "CUPS",
  },
  {
    name: "Baked Beans",
    quantity: 1,
    unit: "TIN",
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
      renderItem={({ item }) => <IngredientListItem ingredient={item} />}
    />
    <AddListItem label="ADD INGREDIENT" />
  </ScrollView>
);

export default CreateRecipeIngredients;
