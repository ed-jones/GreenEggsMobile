/**
 * Author: Victor Ying
 */
import React, { useContext, useState } from 'react'
import { Queries } from '@greeneggs/graphql'
import { Divider } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/core'
import {
  Ingredients,
  IngredientsVariables,
  Ingredients_ingredients_data,
  RecipeFilter,
  Sort,
} from '@greeneggs/types/graphql'
import { SearchContext } from '@greeneggs/context'

import { View } from 'react-native'
import { AddToFilter } from '../common/add-to-filter'
import { Background } from '@greeneggs/ui/background'
import { TopNavigation } from '@greeneggs/ui/top-navigation'
import { Input } from '@greeneggs/ui/input'
import { LazyListAlpha } from '@greeneggs/ui/lazy-alpha-list'
import { SelectableListItem } from '@greeneggs/ui/list-items'
import { AlphabetType } from '@greeneggs/ui/alpha-list'
import { EmptyState } from '@greeneggs/ui/empty-state'
import * as Icons from '@greeneggs/ui/icons'

/**
 * Screen for requiring ingredients in a search
 */
export function FilterIngredientsIncluded() {
  const navigation = useNavigation()
  const [query, setQuery] = useState('')
  const { searchState, setSearchState } = useContext(SearchContext)
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(
    searchState.filter.ingredients?.includes ?? []
  )

  const setSelected = (selected: boolean, id: string) => {
    setSelectedIngredients(
      selected ? [...selectedIngredients, id] : [...selectedIngredients.filter((excludes) => excludes !== id)]
    )
  }

  const addToFilter = () => {
    setSearchState?.({
      ...searchState,
      filter: {
        ...searchState.filter,
        ingredients: {
          ...searchState.filter.ingredients,
          includes: selectedIngredients,
        },
      },
    })
    navigation.goBack()
  }

  return (
    <Background>
      <TopNavigation title='Ingredients (included)' />
      <Input
        style={{ padding: 16, backgroundColor: 'white' }}
        placeholder='Search ingredients...'
        accessoryLeft={Icons.Search}
        onChangeText={setQuery}
        value={query}
      />
      <LazyListAlpha<Ingredients, IngredientsVariables, Ingredients_ingredients_data, Sort, RecipeFilter>
        renderItem={(item) => (
          <>
            <SelectableListItem
              title={item.name}
              selected={selectedIngredients.includes(item.id)}
              setSelected={(selected) => setSelected(selected, item.id)}
            />
            <Divider />
          </>
        )}
        categoriseItem={(item) => item.name[0].toLowerCase() as AlphabetType}
        query={Queries.getIngredients}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={
          <View style={{ flexGrow: 1, justifyContent: 'center' }}>
            <EmptyState description="Couldn't find any ingredients." />
          </View>
        }
        variables={{
          query,
        }}
        dataKey='ingredients'
      />
      <AddToFilter
        clearFilters={() => setSelectedIngredients([])}
        filterCount={selectedIngredients.length}
        addToFilter={addToFilter}
      />
    </Background>
  )
}
