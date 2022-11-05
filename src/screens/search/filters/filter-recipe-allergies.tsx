/**
 * Author: Victor Ying
 */
import React, { useContext, useState } from 'react'
import { Queries } from '@greeneggs/graphql'
import { Divider } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/core'
import { Allergies, AllergiesVariables, Allergies_allergies_data, RecipeFilter, Sort } from '@greeneggs/types/graphql'
import { SearchContext } from '@greeneggs/context'
import { View } from 'react-native'
import { AddToFilter } from '../common/add-to-filter'
import { LazyListAlpha } from '@greeneggs/ui/lazy-alpha-list'
import { Background } from '@greeneggs/ui/background'
import { TopNavigation } from '@greeneggs/ui/top-navigation'
import { Input } from '@greeneggs/ui/input'
import { SelectableListItem } from '@greeneggs/ui/list-items'
import { AlphabetType } from '@greeneggs/ui/alpha-list'
import { EmptyState } from '@greeneggs/ui/empty-state'
import * as Icons from '@greeneggs/ui/icons'

/**
 * Screen for requiring certain allergy requirements in a search
 */
export function FilterRecipeAllergies() {
  const navigation = useNavigation()
  const [query, setQuery] = useState('')
  const { searchState, setSearchState } = useContext(SearchContext)
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>(searchState.filter.allergies ?? [])

  const setSelected = (selected: boolean, id: string) => {
    setSelectedAllergies(
      selected ? [...selectedAllergies, id] : [...selectedAllergies.filter((allergies) => allergies !== id)]
    )
  }

  const addToFilter = () => {
    setSearchState?.({
      ...searchState,
      filter: {
        ...searchState.filter,
        allergies: selectedAllergies,
      },
    })
    navigation.goBack()
  }

  return (
    <Background>
      <TopNavigation title='Allergies' />
      <Input
        style={{ padding: 16, backgroundColor: 'white' }}
        placeholder='Search allergies...'
        accessoryLeft={Icons.Search}
        onChangeText={setQuery}
        value={query}
      />
      <LazyListAlpha<Allergies, AllergiesVariables, Allergies_allergies_data, Sort, RecipeFilter>
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
        query={Queries.getAllergies}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={
          <View style={{ flexGrow: 1, justifyContent: 'center' }}>
            <EmptyState description="Couldn't find any allergies." />
          </View>
        }
        variables={{
          query,
        }}
        dataKey='allergies'
      />
      <AddToFilter
        clearFilters={() => setSelectedAllergies([])}
        filterCount={selectedAllergies.length}
        addToFilter={addToFilter}
      />
    </Background>
  )
}
