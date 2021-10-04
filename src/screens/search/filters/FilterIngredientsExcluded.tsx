import React, { FC, useState } from "react";
import { Icons, Queries } from "@greeneggs/core";
import {
  Divider,
  Input,
  ListItem,
  TopNavigation,
  TopNavigationAction,
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
import LazyListAlpha from "@greeneggs/core/lazy-alpha-list";
import { AlphabetType } from "@greeneggs/core/alpha-list";
import FilterControlGroup from "@greeneggs/core/filter-control-group";
import AddToFilter from "../common/add-to-filter";

const FilterIngredientsExcluded: FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");

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
        title="Ingredients (Excluded)"
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
      <AddToFilter filterCount={0} />
    </>
  );
};

export default FilterIngredientsExcluded;
