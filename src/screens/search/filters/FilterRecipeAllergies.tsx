import React, { FC, useContext, useState } from 'react';
import { Icons, Queries } from '@greeneggs/core';
import { Divider } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/core';
import { Allergies, AllergiesVariables, Allergies_allergies_data, RecipeFilter, Sort } from '@greeneggs/types/graphql';
import LazyListAlpha from '@greeneggs/core/lazy-alpha-list';
import { AlphabetType } from '@greeneggs/core/alpha-list';
import AddToFilter from '../common/add-to-filter';
import { SearchContext } from '@greeneggs/providers/SearchStateProvider';
import SelectableListItem from '@greeneggs/core/selectable-list-item';
import Background from '@greeneggs/core/background';
import { Input, TopNavigation } from '@greeneggs/ui';

const FilterRecipeAllergies: FC = () => {
  const navigation = useNavigation();
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
    <Background>
      <TopNavigation title="Allergies" />
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
    </Background>
  );
}

export default FilterRecipeAllergies;
