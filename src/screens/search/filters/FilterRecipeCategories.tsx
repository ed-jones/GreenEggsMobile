import React, { FC, useState } from 'react';
import { Icons, Queries } from '@greeneggs/core';
import { List, ListItem, TopNavigation, TopNavigationAction, Text, Divider, Input } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Categories, CategoriesVariables, Categories_categories_data, RecipeFilter, Sort } from '@greeneggs/types/graphql';
import { useQuery } from '@apollo/client';
import LoadingScreen from '../../loading/LoadingScreen';
import LazyListAlpha from '@greeneggs/core/lazy-alpha-list';
import { AlphabetType } from '@greeneggs/core/alpha-list';

const FilterRecipeCategories: FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");

  return (
    <>
      <TopNavigation
        style={{ backgroundColor: "transparent", paddingTop: insets.top }}
        accessoryLeft={() => 
          <TopNavigationAction
            icon={Icons.Back}
            onPress={() => navigation.goBack()}
          />
        }
        title="Ingredients (Excluded)"
        alignment="center"
      />
      <Input
        style={{ padding: 16 }}
        placeholder="Search Allergies"
        accessoryLeft={Icons.Search}
        onChangeText={setQuery}
        value={query}
      />
      <LazyListAlpha<
        Categories,
        CategoriesVariables,
        Categories_categories_data,
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
        query={Queries.GET_CATEGORIES}
        emptyMessage={"No categories found"}
        errorMessage={"Error"}
        variables={{
          query,
        }}
        dataKey="categories"
      />
    </>
  );
}

export default FilterRecipeCategories;
