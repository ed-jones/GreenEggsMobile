import React, { FC } from "react";
import RecipeCardSmall from "@greeneggs/core/recipe-card-small";
import { useQuery } from "@apollo/client";
import { Queries, Alert } from "@greeneggs/core";
import LoadingScreen from "../loading/LoadingScreen";
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
import LazyList from "@greeneggs/core/lazy-list";
import TopNavigationGeneric from "@greeneggs/core/top-navigation-generic";

const SavedRecipesHeader = () => (
  <TopNavigationGeneric title="Saved Recipes" accessoryLeft={undefined} />
);

const SavedRecipes: FC = () => {
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
    return <Text>Error! {error.message}</Text>;
  }
  const recipes = data?.savedRecipes.data;
  if (recipes === undefined || recipes === null) {
    return <Text>Error! Recipe not found</Text>;
  }
  if (recipes.length === 0) {
    return (
      <>
        <SavedRecipesHeader />
        <Alert
          style={{ padding: 16 }}
          message="You haven't saved any recipes yet! Save some recipes and they will appear here."
          type="info"
        />
      </>
    );
  }
  return (
    <>
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
        emptyMessage="ou haven't saved any recipes yet! Save some recipes and they will appear here."
        errorMessage="Error! No recipes found."
        renderItem={({ item: recipe }) => (
          <View style={{ marginBottom: 16, padding: 16 }}>
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
    </>
  );
};

export default SavedRecipes;
