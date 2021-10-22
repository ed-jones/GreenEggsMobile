/**
 * Author: Dimitri Zvolinski
 */
import React from "react";
import { recipe_recipe_data_ingredients } from "@greeneggs/types/graphql";
import { View } from "react-native";
import { Divider } from "@ui-kitten/components";
import { IngredientListItem, ViewMore } from "@greeneggs/ui";
import { useNavigation } from "@react-navigation/core";

interface IRecipeIngredients {
  ingredients: recipe_recipe_data_ingredients[];
  servingCount?: number;
  defaultServingCount?: number | null;
}

/**
 * Component for displaying an abbreviated list of ingredients, with the option to view more in a new screen.
 */
export const RecipeIngredients = ({
  ingredients,
  servingCount,
  defaultServingCount,
}: IRecipeIngredients) => {
  const navigation = useNavigation();
  let multiplier = 1;
  if (servingCount && defaultServingCount) {
    multiplier = servingCount / defaultServingCount;
  }
  return (
    <View style={{ marginHorizontal: -16 }}>
      {ingredients
        .slice(0, 5)
        .map((ingredient: recipe_recipe_data_ingredients, index) => (
          <IngredientListItem
            ingredient={{
              ...ingredient,
              quantity: ingredient.quantity ? ingredient.quantity * multiplier : null,
            }}
            key={index.toString()}
          />
        ))}
      <Divider />
      <ViewMore
        onPress={() =>
          navigation.navigate("RecipeAllIngredients", {
            ingredients,
            multiplier,
          })
        }
      />
    </View>
  );
};
