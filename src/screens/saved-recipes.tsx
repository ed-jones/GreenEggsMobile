/**
 * Author: Edward Jones
 */
import React, { FC } from "react";
import { useQuery } from "@apollo/client";
import { Queries } from "@greeneggs/graphql";
import { LoadingScreen } from "./loading-screen";
import { Text } from "@ui-kitten/components";
import {
  RecipeFilter,
  savedRecipes,
  savedRecipesVariables,
  savedRecipes_savedRecipes_data,
  Sort,
  savedRecipes as SavedRecipesType,
} from "@greeneggs/types/graphql";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import {
  TopNavigation,
  Background,
  Callout,
  LazyList,
  RecipeCardSmall,
  EmptyState,
} from "@greeneggs/ui";

const SavedRecipesHeader = () => (
  <TopNavigation title="Saved Recipes" accessoryLeft={undefined} />
);

export const SavedRecipes: FC = () => {
  const navigation = useNavigation();
  const { data, loading, error } = useQuery<
    savedRecipes,
    savedRecipesVariables
  >(Queries.GET_SAVED_RECIPES, {
    variables: {
      offset: 0,
      limit: 10,
    },
  });
  if (loading) {
    return <LoadingScreen />;
  }
  if (error) {
    return (
      <Background>
        <Text>Error! {error.message}</Text>
      </Background>
    );
  }
  const recipes = data?.savedRecipes.data;

  return (
    <Background>
      <SavedRecipesHeader />
      <LazyList<
        SavedRecipesType,
        savedRecipesVariables,
        savedRecipes_savedRecipes_data,
        Sort,
        RecipeFilter
      >
        query={Queries.GET_SAVED_RECIPES}
        variables={{}}
        dataKey="savedRecipes"
        emptyMessage="You haven't saved any recipes yet! Save some recipes and they will appear here."
        renderItem={({ item: recipe }) => (
          <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
            <RecipeCardSmall
              recipe={recipe}
              onPress={() =>
                navigation.navigate("Recipe", {
                  recipeId: recipe.id,
                })
              }
            />
          </View>
        )}
      />
    </Background>
  );
};
