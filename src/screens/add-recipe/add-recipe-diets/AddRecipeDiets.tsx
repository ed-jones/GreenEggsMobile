import React from "react";
import { List, ListItem, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native";
import { addRecipeStyles, RecipeForm } from "../AddRecipe";
import AddListItem from "@greeneggs/core/add-list-item/AddListItem";
import Alert from "@greeneggs/core/alert/Alert";

interface IAddRecipeDiets {
  form: RecipeForm;
  navigation: any;
}

const AddRecipeDiets = ({ form, navigation }: IAddRecipeDiets) => (
  <ScrollView>
    <Alert
      type="warning"
      message={
        <Text>
          Tag this recipe with relevant diets, such as{" "}
          <Text style={{ fontWeight: "bold" }}>Kosher</Text>,{" "}
          <Text style={{ fontWeight: "bold" }}>Vegetarian</Text> or{" "}
          <Text style={{ fontWeight: "bold" }}>Gluten Free</Text>.
        </Text>
      }
      style={addRecipeStyles.view}
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
  </ScrollView>
);

export default AddRecipeDiets;
