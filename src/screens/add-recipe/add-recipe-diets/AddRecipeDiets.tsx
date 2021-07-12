import React from "react";
import { List, ListItem, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native";
import { addRecipeStyles, RecipeForm } from "../AddRecipe";
import AddListItem from "@greeneggs/core/add-list-item/AddListItem";

interface IAddRecipeDiets {
  form: RecipeForm;
  navigation: any;
}

const AddRecipeDiets = ({ form, navigation }: IAddRecipeDiets) => (
  <ScrollView>
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
  </ScrollView>
);

export default AddRecipeDiets;
