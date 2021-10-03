import React, { FC, useState } from "react";
import { Icons, Queries } from "@greeneggs/core";
import {
  ListItem,
  TopNavigation,
  TopNavigationAction,
  Text,
  Input,
  Divider,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Ingredients,
  IngredientsVariables,
  Ingredients_ingredients_data,
  RecipeFilter,
  Sort,
} from "@greeneggs/types/graphql";
import { useQuery } from "@apollo/client";

import LoadingScreen from "../../loading/LoadingScreen";
import { AlphabetType, buildAlphaListItems } from "@greeneggs/core/alpha-list";
import LazyListAlpha from "@greeneggs/core/lazy-alpha-list";

const FilterIngredientsIncluded: FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const { data, loading, error } = useQuery<Ingredients>(
    Queries.GET_INGREDIENTS,
    {
      variables: {
        query: "",
        offset: 0,
        limit: 100,
      },
    }
  );
  const ingredients = data?.ingredients.data;

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <Text>Error! {error.message}</Text>;
  }

  if (ingredients === undefined) {
    return <Text>No Ingredients Found</Text>;
  }

  const alphaListItems = buildAlphaListItems({
    items: ingredients.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(query.toLowerCase())
    ),
    categoriseItem: (item) => item.name[0].toLowerCase() as AlphabetType,
  });

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
        title="Ingredients (Included)"
        alignment="center"
      />
      <Input
        style={{ padding: 16 }}
        placeholder="Search Ingredients"
        accessoryLeft={Icons.Search}
        onChangeText={setQuery}
        value={query}
      />
      <LazyListAlpha<
        Ingredients,
        IngredientsVariables,
        Ingredients_ingredients_data,
        Sort,
        RecipeFilter
      >
        renderItem={(item) => (
          <>
            <ListItem title={item.name} />
            <Divider />
          </>
        )}
        categoriseItem={(item) => item.name[0].toLowerCase() as AlphabetType}
        query={Queries.GET_INGREDIENTS}
        emptyMessage={"No ingredients found"}
        errorMessage={"Error"}
        variables={{
          query,
        }}
        dataKey="ingredients"
      />
    </>
  );
};

export default FilterIngredientsIncluded;
