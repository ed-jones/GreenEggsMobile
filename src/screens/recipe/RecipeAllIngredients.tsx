import React from "react";
import { recipe_recipe_data_ingredients } from "@greeneggs/types/graphql";
import { View, StyleSheet } from "react-native";
import {
  Divider,
  List,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import IngredientListItem from "@greeneggs/core/ingredient-list-item/IngredientListItem";
import ViewMore from "@greeneggs/core/view-more/ViewMore";
import { Icons } from "@greeneggs/core";
import { useNavigation } from "@react-navigation/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
});

const RecipeIngredients = ({ route }: any) => {
  const { ingredients } = route.params;

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <>
      <TopNavigation
        style={{ backgroundColor: "transparent", paddingTop: insets.top }}
        accessoryLeft={() => (
          <TopNavigationAction
            icon={Icons.Back}
            onPress={() => navigation.goBack()}
          />
        )}
        alignment="center"
        title="All Ingredients"
      />
      <View style={{ ...styles.content, marginHorizontal: -16 }}>
        <List
          data={ingredients}
          renderItem={({ item }: { item: recipe_recipe_data_ingredients }) => (
            <IngredientListItem ingredient={item} />
          )}
        />
        <Divider />
      </View>
    </>
  );
};

export default RecipeIngredients;
