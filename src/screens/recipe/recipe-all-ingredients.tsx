import React from "react";
import { recipe_recipe_data_ingredients } from "@greeneggs/types/graphql";
import { View, StyleSheet } from "react-native";
import { Divider, List } from "@ui-kitten/components";
import { TopNavigation, Background, IngredientListItem } from "@greeneggs/ui";

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
});

const RecipeIngredients = ({ route }: any) => {
  const { ingredients } = route.params;

  return (
    <Background>
      <TopNavigation title="All Ingredients" />
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
