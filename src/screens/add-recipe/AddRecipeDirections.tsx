import React from "react";
import { Divider, Input, List, ListItem, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native";
import { addRecipeStyles, RecipeForm } from "./AddRecipe";
import { Icons } from "@greeneggs/core";
import AddListItem from "@greeneggs/core/add-list-item/AddListItem";

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
  <ScrollView>
    <Text
      category="h5"
      style={{ ...addRecipeStyles.heading, ...addRecipeStyles.view }}
    >
      Directions
    </Text>
    <List
      data={Directions}
      renderItem={({ item }) => (
        <ListItem title={item.title} description={item.description} />
      )}
    />
    <AddListItem label="ADD STEP" />
  </ScrollView>
);

export default AddRecipeDirections;
