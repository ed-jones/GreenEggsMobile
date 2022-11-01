/**
 * Author: Victor Ying
 */
import React, { useContext, useState } from 'react'
import { Queries } from '@greeneggs/graphql'
import { Divider } from '@ui-kitten/components'
import {
  Input,
  TopNavigation,
  Background,
  Icons,
  LazyListAlpha,
  AlphabetType,
  SelectableListItem,
  EmptyState,
} from '@greeneggs/ui'
import { useNavigation } from '@react-navigation/core'
import {
  Categories,
  CategoriesVariables,
  Categories_categories_data,
  RecipeFilter,
  Sort,
} from '@greeneggs/types/graphql'
import { SearchContext } from '@greeneggs/providers/search-state-provider'

import { AddToFilter } from '../common'
import { View } from 'react-native'

/**
 * Screen for requiring certain categories in a recipe search.
 */
export function FilterRecipeCategories() {
  const navigation = useNavigation()
  const [query, setQuery] = useState('')
  const { searchState, setSearchState } = useContext(SearchContext)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(searchState.filter.categories ?? [])

  const setSelected = (selected: boolean, id: string) => {
    setSelectedCategories(
      selected ? [...selectedCategories, id] : [...selectedCategories.filter((categories) => categories !== id)]
    )
  }

  const addToFilter = () => {
    setSearchState?.({
      ...searchState,
      filter: {
        ...searchState.filter,
        categories: selectedCategories,
      },
    })
    navigation.goBack()
  }

  return (
    <Background>
      <TopNavigation title='Categories' />
      <Input
        style={{ padding: 16, backgroundColor: 'white' }}
        placeholder='Search categories...'
        accessoryLeft={Icons.Search}
        onChangeText={setQuery}
        value={query}
      />
      <LazyListAlpha<Categories, CategoriesVariables, Categories_categories_data, Sort, RecipeFilter>
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
        query={Queries.getCategories}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={
          <View style={{ flexGrow: 1, justifyContent: 'center' }}>
            <EmptyState description="Couldn't find any categories." />
          </View>
        }
        variables={{
          query,
        }}
        dataKey='categories'
      />
      <AddToFilter
        clearFilters={() => setSelectedCategories([])}
        filterCount={selectedCategories.length}
        addToFilter={addToFilter}
      />
    </Background>
  )
}
