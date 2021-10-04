import React, { FC, useContext, useState } from 'react';
import { Icons, Queries } from '@greeneggs/core';
import { List, ListItem, TopNavigation, TopNavigationAction, Text, Input, Divider, Layout } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Diets, DietsVariables, Diets_diets_data, RecipeFilter, Sort } from '@greeneggs/types/graphql';
import { useQuery } from '@apollo/client';
import LoadingScreen from '../../loading/LoadingScreen';
import LazyListAlpha from '@greeneggs/core/lazy-alpha-list';
import { AlphabetType } from '@greeneggs/core/alpha-list';
import AddToFilter from '../common/add-to-filter';
import SelectableListItem from '@greeneggs/core/selectable-list-item';
import { SearchContext } from '@greeneggs/providers/SearchStateProvider';

const FilterRecipeDiets: FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const { searchState, setSearchState } = useContext(SearchContext);
  const [selectedDiets, setSelectedDiets] = useState<string[]>(
    searchState.filter.diets ?? []
  );

  const setSelected = (selected: boolean, id: string) => {
    setSelectedDiets(
      selected
        ? [...selectedDiets, id]
        : [...selectedDiets.filter((diets) => diets !== id)]
    );
  };

  const addToFilter = () => {
    setSearchState?.({
      ...searchState,
      filter: {
        ...searchState.filter,
        diets: selectedDiets,
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
        title="Diets"
        alignment="center"
      />
      <Input
        style={{ padding: 16, backgroundColor: 'white' }}
        placeholder="Search Diets"
        accessoryLeft={Icons.Search}
        onChangeText={setQuery}
        value={query}
      />
      <LazyListAlpha<
        Diets,
        DietsVariables,
        Diets_diets_data,
        Sort,
        RecipeFilter
      >
        renderItem={(item) => (
          <>
            <SelectableListItem
              title={item.name}
              selected={selectedDiets.includes(item.id)}
              setSelected={(selected) => setSelected(selected, item.id)}
            />
            <Divider />
          </>
        )}
        categoriseItem={(item) => item.name[0].toLowerCase() as AlphabetType}
        query={Queries.GET_DIETS}
        emptyMessage={"No diets found"}
        errorMessage={"Error"}
        variables={{
          query,
        }}
        dataKey="diets"
      />
      <AddToFilter
        clearFilters={() => setSelectedDiets([])}
        filterCount={selectedDiets.length}
        addToFilter={addToFilter}
      />
    </Layout>
  );
}

export default FilterRecipeDiets;
