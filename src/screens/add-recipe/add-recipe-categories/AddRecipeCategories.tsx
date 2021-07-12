import React from "react";
import { Divider, Input, List, ListItem, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native";
import { addRecipeStyles, RecipeForm } from "../AddRecipe";
import AddListItem from "@greeneggs/core/add-list-item/AddListItem";

interface IAddRecipeCategories {
  form: RecipeForm;
  navigation: any;
}

const AddRecipeCategories = ({ form, navigation }: IAddRecipeCategories) => (
  <ScrollView>
    <Text
      category="h5"
      style={{ ...addRecipeStyles.heading, ...addRecipeStyles.view }}
    >
      Categories
    </Text>
    <List
      data={form.watch("categories")}
      renderItem={({ item }) => (
        <>
          <ListItem title={item.name} />
        </>
      )}
    />
    <AddListItem
      label="ADD CATEGORY"
      onPress={() =>
        navigation.navigate("CreateCategory", {
          form,
          index: form.getValues("categories")?.length || 0,
        })
      }
    />
    <Text
      category="h5"
      style={{ ...addRecipeStyles.heading, ...addRecipeStyles.view }}
    >
      Diets
    </Text>
    <List
      data={form.watch("diets")}
      renderItem={({ item }) => (
        <>
          <ListItem title={item.name} />
        </>
      )}
    />
    <AddListItem
      label="ADD DIET"
      onPress={() =>
        navigation.navigate("CreateDiet", {
          form,
          index: form.getValues("diets")?.length || 0,
        })
      }
    />
    <Text
      category="h5"
      style={{ ...addRecipeStyles.heading, ...addRecipeStyles.view }}
    >
      Allergies
    </Text>
    <List
      data={form.watch("allergies")}
      renderItem={({ item }) => (
        <>
          <ListItem title={item.name} />
        </>
      )}
    />
    <AddListItem
      label="ADD ALLERGY"
      onPress={() =>
        navigation.navigate("CreateAllergy", {
          form,
          index: form.getValues("allergies")?.length || 0,
        })
      }
    />
  </ScrollView>
);

export default AddRecipeCategories;
