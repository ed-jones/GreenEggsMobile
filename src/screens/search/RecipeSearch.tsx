import { useQuery } from '@apollo/client';
import { Queries } from '@greeneggs/core';
import React, { FC, useContext, useState } from 'react';
import LazyList from '@greeneggs/core/lazy-list';
import RecipeCardSmall from '@greeneggs/core/recipe-card-small';
import { RecipeFilter, recipes, recipesVariables, recipes_recipes_data, Sort } from '@greeneggs/types/graphql';
import { useNavigation } from '@react-navigation/core';
import { View } from 'react-native';
import { ISearchContext, SearchContext } from '@greeneggs/providers/SearchStateProvider';
import { IndexPath, Select, SelectItem, Tab, TabBar } from '@ui-kitten/components';
import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';

const { Navigator, Screen } = createMaterialTopTabNavigator();

const RecipeSearch: FC = () => {
  const navigation = useNavigation();
  const {searchState} = useContext<ISearchContext>(SearchContext);
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
        sort: searchState.sort ?? Sort.NEW, // FIXME: needs to also user searchState
        filter: searchState.filter,
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

const SearchTabBar = ({ navigation, state }: MaterialTopTabBarProps) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <Tab title="RECIPES" />
    <Tab title="USERS" />
  </TabBar>
);

const SearchTabs: FC = () => {
  const {searchState, setSearchState} = useContext<ISearchContext>(SearchContext);
  const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(Object.values(Sort).indexOf(searchState.sort)));

  function getSortFromIndex(index: IndexPath | IndexPath[]): Sort {
    return Object.values(Sort)[(!Array.isArray(index) && index.row) || 0]
  }

  function onSelect(index: IndexPath | IndexPath[]) {
    setSelectedIndex(index);
    setSearchState?.({ ...searchState, sort: getSortFromIndex(selectedIndex)})
  }

  return (
      <Navigator
        tabBar={(props: MaterialTopTabBarProps) => (
          <View style={{flexDirection: "row", paddingBottom: 16, marginHorizontal: 16 }}>
            <View style={{ flex: 1 }}>
              <SearchTabBar {...props} />
            </View>
            <Select
              style={{ flexGrow: 1, maxWidth: 150, marginLeft: 16 }}
              selectedIndex={selectedIndex}
              onSelect={onSelect}
              value={getSortFromIndex(selectedIndex)}
            >
              {Object.values(Sort).map((sortType) => (
              <SelectItem title={sortType} />
              ))}
            </Select>
          </View>
        )}
      >
        <Screen name="NEWS FEED" component={RecipeSearch} />
        <Screen name="TRENDING" component={RecipeSearch} />
      </Navigator>

  )
}

export default SearchTabs;
