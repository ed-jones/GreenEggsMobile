import React from "react";
import { Divider, Input, List, ListItem, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native";
import { addRecipeStyles, RecipeForm } from "./AddRecipe";

const Categories = [
  {
    title: "Breakfast",
  },
  {
    title: "Dessert",
  },
];

const Diets = [
  {
    title: "Vegan",
  },
  {
    title: "Vegetarian",
  },
];

const Allergies = [
  {
    title: "Eggs",
  },
  {
    title: "Dairy",
  },
];

interface IAddRecipeCategories {
  form: RecipeForm;
}

const AddRecipeCategories = ({ form }: IAddRecipeCategories) => (
  <ScrollView>
    <Text
      category="h5"
      style={{ ...addRecipeStyles.heading, ...addRecipeStyles.view }}
    >
      Categories
    </Text>
    <List
      data={Categories}
      renderItem={({ item }) => (
        <>
          <ListItem title={item.title} />
          <Divider />
        </>
      )}
    />
    <ListItem title="Add Category" />
    <Text
      category="h5"
      style={{ ...addRecipeStyles.heading, ...addRecipeStyles.view }}
    >
      Diets
    </Text>
    <List
      data={Diets}
      renderItem={({ item }) => (
        <>
          <ListItem title={item.title} />
          <Divider />
        </>
      )}
    />
    <ListItem title="Add Diet" />
    <Text
      category="h5"
      style={{ ...addRecipeStyles.heading, ...addRecipeStyles.view }}
    >
      Allergies
    </Text>
    <List
      data={Allergies}
      renderItem={({ item }) => (
        <>
          <ListItem title={item.title} />
          <Divider />
        </>
      )}
    />
    <ListItem title="Add Allergy" />
  </ScrollView>
);

export default AddRecipeCategories;
