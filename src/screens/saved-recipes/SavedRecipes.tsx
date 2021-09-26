import React, { FC } from "react";
import RecipeCardSmall from "@greeneggs/core/recipe-card-small";
import { useQuery } from "@apollo/client";
import { Queries, Alert } from "@greeneggs/core";
import LoadingScreen from "../loading/LoadingScreen";
import { Text, TopNavigation } from "@ui-kitten/components";
import { savedRecipes, savedRecipesVariables } from "@greeneggs/types/graphql";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SavedRecipes: FC = () => {
  const insets = useSafeAreaInsets();
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
    return <Text>Error! {error.message}</Text>;
  }
  const recipes = data?.savedRecipes.data;
  if (recipes === undefined || recipes === null) {
    return <Text>Error! Recipe not found</Text>;
  }
  if (recipes.length === 0) {
    return (
      <Alert
        style={{ padding: 16 }}
        message="You haven't saved any recipes yet! Save some recipes and they will appear here."
        type="info"
      />
    );
  }
  return (
    <>
      <TopNavigation
        style={{ backgroundColor: "transparent", paddingTop: insets.top }}
        alignment="center"
        title="Saved Recipes"
      />
      <View style={{ padding: 16 }}>
        {recipes.map((recipe) => (
          <RecipeCardSmall recipe={recipe} onPress={() => null} />
        ))}
      </View>
    </>
  );
};

export default SavedRecipes;
