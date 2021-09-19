import React from "react";
import { recipe_recipe_data_ingredients } from "@greeneggs/types/graphql";
import { View } from "react-native";
import {
  Divider,
  List,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import IngredientListItem from "@greeneggs/core/ingredient-list-item/IngredientListItem";
import ViewMore from "@greeneggs/core/view-more/ViewMore";
import { Icons, Navigation } from "@greeneggs/core";
import { useNavigation } from "@react-navigation/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface IRecipeIngredients {
  ingredients: recipe_recipe_data_ingredients[];
}

const RecipeIngredients = ({ ingredients }: IRecipeIngredients) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ marginHorizontal: -16 }}>
      <List
        data={ingredients.slice(0, 5)}
        renderItem={({ item }: { item: recipe_recipe_data_ingredients }) => (
          <IngredientListItem ingredient={item} />
        )}
      />
      <Divider />
      <ViewMore
        onPress={() =>
          navigation.navigate("RecipeAllIngredients", {
            ingredients,
          })
        }
      />
    </View>
  );
};

export default RecipeIngredients;
