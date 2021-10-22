/**
 * Author: Edward Jones
 */
import React, { FC, useState } from "react";
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
  Icons,
  Input,
  LazyList,
  RecipeCardSmall,
  TopNavigation,
} from "@greeneggs/ui";
import { View } from "react-native";

/**
 * Screen that shows an infinite scrolling list of recipes for a given category.
 */
export const Category: FC = () => {
  const {
    params: { categoryId, categoryName },
  } = useRoute<RouteProp<{ params: { categoryId: string, categoryName: string } }, "params">>();
  const navigation = useNavigation();
  const [query, setQuery] = useState('');

  return (
    <Background>
      <TopNavigation title={categoryName} />
      <Input
        placeholder="Search recipes..."
        size="large"
        accessoryLeft={Icons.Search}
        value={query}
        onChangeText={setQuery}
        style={{ padding: 16 }}
      />
      <LazyList<
        recipes,
        recipesVariables,
        recipes_recipes_data,
        Sort,
        RecipeFilter
      >
        limit={15}
        query={Queries.GET_RECIPES}
        variables={{
          query,
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
