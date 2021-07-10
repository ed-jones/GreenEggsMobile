import React from "react";
import { Divider, Input, List, ListItem, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native";
import { addRecipeStyles, RecipeForm } from "../AddRecipe";
import { Icons, Navigation } from "@greeneggs/core";
import AddListItem from "@greeneggs/core/add-list-item/AddListItem";

interface IAddRecipeDirections {
  form: RecipeForm;
  navigation: any;
}

const AddRecipeDirections = ({ form, navigation }: IAddRecipeDirections) => (
  <ScrollView>
    <Text
      category="h5"
      style={{ ...addRecipeStyles.heading, ...addRecipeStyles.view }}
    >
      Directions
    </Text>
    <List
      data={form.watch("steps")}
      renderItem={({ item }) => (
        <ListItem title={item.title} description={item.description} />
      )}
    />
    <AddListItem
      label="ADD STEP"
      onPress={() =>
        navigation.navigate("CreateStep", {
          form,
          index: form.getValues("steps")?.length || 0,
        })
      }
    />
  </ScrollView>
);

export default AddRecipeDirections;
