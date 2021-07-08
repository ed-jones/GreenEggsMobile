import React from "react";
import { recipe_recipe_data_ingredients } from "@greeneggs/types/graphql";
import { View } from "react-native";
import { Divider, List } from "@ui-kitten/components";
import IngredientListItem from "@greeneggs/core/ingredient-list-item/IngredientListItem";
import ViewMore from "@greeneggs/core/view-more/ViewMore";

interface IRecipeIngredients {
  ingredients: recipe_recipe_data_ingredients[];
}

const RecipeIngredients = ({ ingredients }: IRecipeIngredients) => (
  <View style={{ marginHorizontal: -16 }}>
    <List
      data={ingredients}
      renderItem={({ item }: { item: recipe_recipe_data_ingredients }) => (
        <IngredientListItem ingredient={item} />
      )}
    />
    <Divider />
    <ViewMore onPress={() => null} />
  </View>
);

export default RecipeIngredients;
