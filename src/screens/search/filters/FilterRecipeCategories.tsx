import React, { FC, useContext, useState } from 'react';
import { Queries } from "@greeneggs/graphql";
import { Divider } from '@ui-kitten/components';
import { Input, TopNavigation, Background, Icons } from '@greeneggs/ui';
import { useNavigation } from '@react-navigation/core';
import { Categories, CategoriesVariables, Categories_categories_data, RecipeFilter, Sort } from '@greeneggs/types/graphql';
import LazyListAlpha from '@greeneggs/core/lazy-alpha-list';
import { AlphabetType } from '@greeneggs/core/alpha-list';
import AddToFilter from '../common/add-to-filter';
import { SearchContext } from '@greeneggs/providers/SearchStateProvider';
import SelectableListItem from '@greeneggs/core/selectable-list-item';

const FilterRecipeCategories: FC = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const { searchState, setSearchState } = useContext(SearchContext);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchState.filter.categories ?? []
  );

  const setSelected = (selected: boolean, id: string) => {
    setSelectedCategories(
      selected
        ? [...selectedCategories, id]
        : [...selectedCategories.filter((categories) => categories !== id)]
    );
  };

  const addToFilter = () => {
    setSearchState?.({
      ...searchState,
      filter: {
        ...searchState.filter,
        categories: selectedCategories,
      },
    });
    navigation.goBack();
  };

  return (
    <Background>
      <TopNavigation title="Categories" />
      <Input
        style={{ padding: 16, backgroundColor: 'white' }}
        placeholder="Search Categories"
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
            <SelectableListItem
              title={item.name}
              selected={selectedCategories.includes(item.id)}
              setSelected={(selected) => setSelected(selected, item.id)}
            />
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
      <AddToFilter
        clearFilters={() => setSelectedCategories([])}
        filterCount={selectedCategories.length}
        addToFilter={addToFilter}
      />
    </Background>
  );
}

export default FilterRecipeCategories;
