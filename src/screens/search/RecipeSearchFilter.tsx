import React, { FC, useContext } from "react";
import {
  Divider,
  Layout,
  List,
  ListItem,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";
import { Icons } from "@greeneggs/core";
import FilterControlGroup from "@greeneggs/core/filter-control-group";
import { SearchContext, SearchState } from "@greeneggs/providers/SearchStateProvider";
import CountCircle from "./common/count-circle";
import { View } from "react-native";

export function countActiveFilters(searchState: SearchState) {
  let activeFilterCount = 0;

  if (searchState.filter.allergies?.length ?? 0 > 0) {
    activeFilterCount++;
  }

  if (searchState.filter.categories?.length ?? 0 > 0) {
    activeFilterCount++;
  }

  if (searchState.filter.diets?.length ?? 0 > 0) {
    activeFilterCount++;
  }

  if (searchState.filter.ingredients?.excludes?.length ?? 0 > 0) {
    activeFilterCount++;
  }

  if (searchState.filter.ingredients?.includes?.length ?? 0 > 0) {
    activeFilterCount++;
  }

  return activeFilterCount;
}

interface FilterListItemProps {
  title: string;
  to: string;
  count: number;
}

const RecipeSearchFilter: FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { searchState, setSearchState } = useContext(SearchContext);

  function applyAllFilters() {
    setSearchState?.(searchState);
    navigation.goBack();
  }

  const FilterOptions: FilterListItemProps[] = [
    {
      title: "Ingredients (Included)",
      to: "FilterIngredientsIncluded",
      count: searchState.filter.ingredients?.includes?.length ?? 0,
    },
    {
      title: "Ingredients (Excluded)",
      to: "FilterIngredientsExcluded",
      count: searchState.filter.ingredients?.excludes?.length ?? 0,
    },
    {
      title: "Categories",
      to: "FilterRecipeCategories",
      count: searchState.filter.categories?.length ?? 0,
    },
    {
      title: "Allergies",
      to: "FilterRecipeAllergies",
      count: searchState.filter.allergies?.length ?? 0,
    },
    {
      title: "Diets",
      to: "FilterRecipeDiets",
      count: searchState.filter.diets?.length ?? 0,
    },
    { title: "Cook Time", to: "FilterRecipeCookTime", count: 0 },
  ];

  return (
    <Layout style={{ flex: 1 }} level="2">
      <TopNavigation
        style={{ backgroundColor: "transparent", paddingTop: insets.top }}
        accessoryLeft={() => (
          <TopNavigationAction
            icon={Icons.Back}
            onPress={() => navigation.goBack()}
          />
        )}
        title="Filter Search"
        alignment="center"
      />
      <List
        data={FilterOptions}
        renderItem={({ item }) => (
          <>
            <ListItem
              title={item.title}
              accessoryRight={(props) => (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  { item.count > 0 && <CountCircle {...props}>{item.count}</CountCircle> }
                  <Icons.Forward {...props} />
                </View>
              )}
              onPress={() => navigation.navigate(item.to)}
            />
            <Divider />
          </>
        )}
      />
      <FilterControlGroup
        label={`${countActiveFilters(searchState)} CATEGORIES SELECTED`}
        clearButton={{
          title: "CLEAR ALL",
          onPress: () => setSearchState?.({ ...searchState, filter: {} }),
        }}
        applyButton={{ title: "APPLY ALL FILTERS", onPress: applyAllFilters }}
      />
    </Layout>
  );
};

export default RecipeSearchFilter;
