import React, { FC, useContext, useState } from 'react';
import { Icons, Queries } from '@greeneggs/core';
import { TopNavigation, TopNavigationAction, Divider, Input, Layout } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Allergies, AllergiesVariables, Allergies_allergies_data, RecipeFilter, Sort } from '@greeneggs/types/graphql';
import LazyListAlpha from '@greeneggs/core/lazy-alpha-list';
import { AlphabetType } from '@greeneggs/core/alpha-list';
import AddToFilter from '../common/add-to-filter';
import { SearchContext } from '@greeneggs/providers/SearchStateProvider';
import SelectableListItem from '@greeneggs/core/selectable-list-item';

const FilterRecipeAllergies: FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const { searchState, setSearchState } = useContext(SearchContext);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>(
    searchState.filter.allergies ?? []
  );

  const setSelected = (selected: boolean, id: string) => {
    setSelectedAllergies(
      selected
        ? [...selectedAllergies, id]
        : [...selectedAllergies.filter((allergies) => allergies !== id)]
    );
  };

  const addToFilter = () => {
    setSearchState?.({
      ...searchState,
      filter: {
        ...searchState.filter,
        allergies: selectedAllergies,
      },
    });
    navigation.goBack();
  };


  return (
    <Layout style={{ flex: 1 }} level="2">
      <TopNavigation
        style={{ backgroundColor: "transparent", paddingTop: insets.top }}
        accessoryLeft={() => 
          <TopNavigationAction
            icon={Icons.Back}
            onPress={() => navigation.goBack()}
          />
        }
        title="Allergies"
        alignment="center"
      />
      <Input
        style={{ padding: 16, backgroundColor: 'white' }}
        placeholder="Search Allergies"
        accessoryLeft={Icons.Search}
        onChangeText={setQuery}
        value={query}
      />
      <LazyListAlpha<
        Allergies,
        AllergiesVariables,
        Allergies_allergies_data,
        Sort,
        RecipeFilter
      >
        renderItem={(item) => (
          <>
            <SelectableListItem
              title={item.name}
              selected={selectedAllergies.includes(item.id)}
              setSelected={(selected) => setSelected(selected, item.id)}
            />
            <Divider />
          </>
        )}
        categoriseItem={(item) => item.name[0].toLowerCase() as AlphabetType}
        query={Queries.GET_ALLERGIES}
        emptyMessage={"No allergies found"}
        errorMessage={"Error"}
        variables={{
          query,
        }}
        dataKey="allergies"
      />
      <AddToFilter
        clearFilters={() => setSelectedAllergies([])}
        filterCount={selectedAllergies.length}
        addToFilter={addToFilter}
      />
    </Layout>
  );
}

export default FilterRecipeAllergies;
