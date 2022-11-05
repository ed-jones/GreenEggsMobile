/**
 * Author: Victor Ying
 */
import React, { useContext, useState } from 'react'
import { Queries } from '@greeneggs/graphql'
import { Divider } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/core'
import { Diets, DietsVariables, Diets_diets_data, RecipeFilter, Sort } from '@greeneggs/types/graphql'
import { SearchContext } from '@greeneggs/context'
import { View } from 'react-native'
import { AddToFilter } from '../common/add-to-filter'
import { Background } from '@greeneggs/ui/background'
import { TopNavigation } from '@greeneggs/ui/top-navigation'
import { Input } from '@greeneggs/ui/input'
import { LazyListAlpha } from '@greeneggs/ui/lazy-alpha-list'
import { SelectableListItem } from '@greeneggs/ui/list-items'
import { EmptyState } from '@greeneggs/ui/empty-state'
import { AlphabetType } from '@greeneggs/ui/alpha-list'
import * as Icons from '@greeneggs/ui/icons'

/**
 * Screen for requiring diets in a recipe search
 */
export function FilterRecipeDiets() {
  const navigation = useNavigation()
  const [query, setQuery] = useState('')
  const { searchState, setSearchState } = useContext(SearchContext)
  const [selectedDiets, setSelectedDiets] = useState<string[]>(searchState.filter.diets ?? [])

  const setSelected = (selected: boolean, id: string) => {
    setSelectedDiets(selected ? [...selectedDiets, id] : [...selectedDiets.filter((diets) => diets !== id)])
  }

  const addToFilter = () => {
    setSearchState?.({
      ...searchState,
      filter: {
        ...searchState.filter,
        diets: selectedDiets,
      },
    })
    navigation.goBack()
  }

  return (
    <Background>
      <TopNavigation title='Diets' />
      <Input
        style={{ padding: 16, backgroundColor: 'white' }}
        placeholder='Search diets...'
        accessoryLeft={Icons.Search}
        onChangeText={setQuery}
        value={query}
      />
      <LazyListAlpha<Diets, DietsVariables, Diets_diets_data, Sort, RecipeFilter>
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
        query={Queries.getDiets}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={
          <View style={{ flexGrow: 1, justifyContent: 'center' }}>
            <EmptyState description="Couldn't find any diets." />
          </View>
        }
        variables={{
          query,
        }}
        dataKey='diets'
      />
      <AddToFilter
        clearFilters={() => setSelectedDiets([])}
        filterCount={selectedDiets.length}
        addToFilter={addToFilter}
      />
    </Background>
  )
}
