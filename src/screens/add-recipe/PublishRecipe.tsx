import React from "react";
import { Divider, Input, List, ListItem, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native";
import { addRecipeStyles, RecipeForm } from "./AddRecipe";

const Directions = [
  {
    title: "Chop Carrots",
    description: "After washing the carrots, carefully dice them into small",
  },
  {
    title: "Boil Spaghetti",
    description: "Place the spaghetti in boiling water until it softens",
  },
];

interface IAddRecipeDirections {
  form: RecipeForm;
}

const AddRecipeDirections = ({ form }: IAddRecipeDirections) => (
  <ScrollView style={addRecipeStyles.view}>
    <Input label="RECIPE PRIVACY" placeholder="Public" />
    <Input label="COMMENT PRIVILEGES" placeholder="Everyone" />
    <Input label="LIKE PRIVILEGES" placeholder="Everyone" />
  </ScrollView>
);

export default AddRecipeDirections;
