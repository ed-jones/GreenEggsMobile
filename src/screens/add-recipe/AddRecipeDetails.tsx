import React from "react";
import { Input, Button } from "@ui-kitten/components";
import { ScrollView } from "react-native";
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

interface ICreateRecipeDetails {
  form: RecipeForm;
}

const CreateRecipeDetails = ({ form }: ICreateRecipeDetails) => (
  <ScrollView style={addRecipeStyles.view}>
    <Input label="TITLE" placeholder="Spaghetti Carbonara" />
    <Input
      label="DESCRIPTION"
      placeholder="When I was a little girl growing up in the mountains of Italy..."
    />
    <Input label="ESTIMATED TIME" placeholder="1 hour" />
    <Button>Add Cover Photo</Button>
  </ScrollView>
);

export default CreateRecipeDetails;
