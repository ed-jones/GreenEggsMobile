import React from "react";
import { recipe_recipe_data_ingredients } from "@greeneggs/types/graphql";
import { View, StyleSheet } from "react-native";
import { Divider, List } from "@ui-kitten/components";
import IngredientListItem from "@greeneggs/core/ingredient-list-item/IngredientListItem";
import TopNavigationGeneric from "@greeneggs/core/top-navigation-generic";
import Background from "@greeneggs/core/background";

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
});

const RecipeIngredients = ({ route }: any) => {
  const { ingredients } = route.params;

  return (
    <Background>
      <TopNavigationGeneric title="All Ingredients" />
      <View style={{ ...styles.content, marginHorizontal: -16 }}>
        <List
          data={ingredients}
          renderItem={({ item }: { item: recipe_recipe_data_ingredients }) => (
            <IngredientListItem ingredient={item} />
          )}
        />
        <Divider />
      </View>
    </Background>
  );
};

export default RecipeIngredients;
