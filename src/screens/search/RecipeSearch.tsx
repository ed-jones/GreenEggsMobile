import { Queries } from "@greeneggs/core";
import React, { FC, useContext, useState } from "react";
import LazyList from "@greeneggs/core/lazy-list";
import RecipeCardSmall from "@greeneggs/core/recipe-card-small";
import {
  RecipeFilter,
  recipes,
  recipesVariables,
  recipes_recipes_data,
  Sort,
  Users,
  UsersVariables,
  Users_users_data,
} from "@greeneggs/types/graphql";
import { useNavigation } from "@react-navigation/core";
import { View } from "react-native";
import {
  ISearchContext,
  SearchContext,
} from "@greeneggs/providers/SearchStateProvider";
import {
  Divider,
  IndexPath,
  SelectItem,
  Tab,
  TabBar,
} from "@ui-kitten/components";
import { Select } from "@greeneggs/ui/select";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import UserListItem from "@greeneggs/core/user-list-item";
import Background from "@greeneggs/core/background";

const { Navigator, Screen } = createMaterialTopTabNavigator();

const RecipeSearch: FC = () => {
  const navigation = useNavigation();
  const { searchState } = useContext<ISearchContext>(SearchContext);
  return (
    <Background>
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
          sort: searchState.sort ?? Sort.NEW,
          filter: searchState.filter,
        }}
        dataKey="recipes"
        emptyMessage="No recipes found!"
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
    </Background>
  );
};

const UserSearch: FC = () => {
  const { searchState } = useContext<ISearchContext>(SearchContext);
  return (
    <Background>
      <LazyList<Users, UsersVariables, Users_users_data, Sort, RecipeFilter>
        query={Queries.GET_USERS}
        variables={{
          query: searchState.query,
          sort: searchState.sort ?? Sort.NEW,
        }}
        dataKey="users"
        emptyMessage="No users found!"
        errorMessage="No users found!"
        renderItem={({ item: user }) => (
          <>
            <UserListItem user={user} />
            <Divider />
          </>
        )}
      />
    </Background>
  );
};

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
  const { searchState, setSearchState } =
    useContext<ISearchContext>(SearchContext);
  const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(
    new IndexPath(Object.values(Sort).indexOf(searchState.sort))
  );

  function getSortFromIndex(index: IndexPath | IndexPath[]): Sort {
    return Object.values(Sort)[(!Array.isArray(index) && index.row) || 0];
  }

  function onSelect(index: IndexPath | IndexPath[]) {
    setSearchState?.({ ...searchState, sort: getSortFromIndex(index) });
    setSelectedIndex(index);
  }

  return (
    <Navigator
      tabBar={(props: MaterialTopTabBarProps) => (
        <View
          style={{
            flexDirection: "row",
            paddingBottom: 16,
            marginHorizontal: 16,
          }}
        >
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
      <Screen name="RECIPES" component={RecipeSearch} />
      <Screen name="USERS" component={UserSearch} />
    </Navigator>
  );
};

export default SearchTabs;
