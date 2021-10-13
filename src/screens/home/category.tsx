import React, { FC } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { Queries } from "@greeneggs/graphql";
import {
  recipes,
  recipesVariables,
  recipes_recipes_data,
  Sort,
  RecipeFilter,
} from "@greeneggs/types/graphql";
import {
  Background,
  LazyList,
  RecipeCardSmall,
  TopNavigation,
} from "@greeneggs/ui";
import { View } from "react-native";

export const Category: FC = () => {
  const {
    params: { categoryId, categoryName },
  } = useRoute<RouteProp<{ params: { categoryId: string, categoryName: string } }, "params">>();
  const navigation = useNavigation();

  return (
    <Background>
      <TopNavigation title={categoryName} />
      <LazyList<
        recipes,
        recipesVariables,
        recipes_recipes_data,
        Sort,
        RecipeFilter
      >
        query={Queries.GET_RECIPES}
        variables={{
          query: "",
          sort: Sort.RELEVANT,
          filter: {
            categories: [categoryId],
          },
        }}
        dataKey="recipes"
        emptyMessage="No recipes found!"
        renderItem={({ item: myRecipe }) => (
          <View style={{ marginBottom: 16, marginHorizontal: 16 }}>
            <RecipeCardSmall
              recipe={myRecipe}
              onPress={() =>
                navigation.navigate("Recipe", {
                  recipeId: myRecipe.id,
                })
              }
            />
          </View>
        )}
      />
    </Background>
  );
};
