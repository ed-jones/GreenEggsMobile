import { useQuery } from '@apollo/client';
import { Queries } from '@greeneggs/core';
import React, { FC, useContext } from 'react';
import LazyList from '@greeneggs/core/lazy-list';
import RecipeCardSmall from '@greeneggs/core/recipe-card-small';
import { RecipeFilter, recipes, recipesVariables, recipes_recipes_data, Sort } from '@greeneggs/types/graphql';
import { useNavigation } from '@react-navigation/core';
import { View } from 'react-native';
import { SearchContext } from '@greeneggs/providers/SearchStateProvider';

const RecipeSearch: FC = () => {
  const navigation = useNavigation();
  const {searchState} = useContext(SearchContext)

  return (
    <LazyList<
      recipes,
      recipesVariables,
      recipes_recipes_data,
      Sort,
      RecipeFilter
    >
      query={Queries.GET_RECIPES}
      variables={{
        query: searchState.query,
        sort: Sort.NEW,
        filter: {}
      }}
      dataKey="recipes"
      emptyMessage="You haven't uploaded any recipes! Once you've uploaded some recipes they'll be shown here."
      errorMessage="No recipes found!"
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
  );
}

export default RecipeSearch;
