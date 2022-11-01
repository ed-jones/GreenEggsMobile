/**
 * Author: Victor Ying
 */
import React, { useContext } from 'react'
import { Divider, List, ListItem } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/core'
import { FilterControlGroup, CountCircle } from './common'
import { SearchContext, SearchState } from '@greeneggs/providers/search-state-provider'
import { View } from 'react-native'
import { TopNavigation, Background, Icons } from '@greeneggs/ui'
import { LoggedInNavigationProp } from '@greeneggs/navigation/routes/logged-in-routes'

/**
 * Helper function that counts the number of active filters being applied based on the search state.
 */
export function countActiveFilters(searchState: SearchState): number {
  let activeFilterCount = 0

  if (searchState.filter.allergies?.length ?? 0 > 0) {
    activeFilterCount++
  }

  if (searchState.filter.categories?.length ?? 0 > 0) {
    activeFilterCount++
  }

  if (searchState.filter.diets?.length ?? 0 > 0) {
    activeFilterCount++
  }

  if (searchState.filter.ingredients?.excludes?.length ?? 0 > 0) {
    activeFilterCount++
  }

  if (searchState.filter.ingredients?.includes?.length ?? 0 > 0) {
    activeFilterCount++
  }

  return activeFilterCount
}

interface FilterListItemProps {
  title: string
  to:
    | 'FilterIngredientsIncluded'
    | 'FilterIngredientsExcluded'
    | 'FilterRecipeCategories'
    | 'FilterRecipeAllergies'
    | 'FilterRecipeDiets'
  count: number
}

/**
 * Screen that shows a list of all available filter options.
 */
export function RecipeSearchFilter() {
  const navigation = useNavigation<LoggedInNavigationProp>()
  const { searchState, setSearchState } = useContext(SearchContext)

  function applyAllFilters() {
    setSearchState?.(searchState)
    navigation.goBack()
  }

  const filterOptions: FilterListItemProps[] = [
    {
      title: 'Ingredients (Included)',
      to: 'FilterIngredientsIncluded',
      count: searchState.filter.ingredients?.includes?.length ?? 0,
    },
    {
      title: 'Ingredients (Excluded)',
      to: 'FilterIngredientsExcluded',
      count: searchState.filter.ingredients?.excludes?.length ?? 0,
    },
    {
      title: 'Categories',
      to: 'FilterRecipeCategories',
      count: searchState.filter.categories?.length ?? 0,
    },
    {
      title: 'Allergies',
      to: 'FilterRecipeAllergies',
      count: searchState.filter.allergies?.length ?? 0,
    },
    {
      title: 'Diets',
      to: 'FilterRecipeDiets',
      count: searchState.filter.diets?.length ?? 0,
    },
    // Recipe filtering is disabled because it was not implemented in time
    // { title: "Cook Time", to: "FilterRecipeCookTime", count: 0 },
  ]

  return (
    <Background>
      <TopNavigation title='Filter Search' />
      <List
        data={filterOptions}
        renderItem={({ item: { to, title, count } }) => {
          return (
            <>
              <ListItem
                title={title}
                accessoryRight={(props) => (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {count > 0 && <CountCircle {...props}>{count}</CountCircle>}
                    <Icons.Forward {...props} />
                  </View>
                )}
                onPress={() => navigation.navigate(to)}
              />
              <Divider />
            </>
          )
        }}
      />
      <FilterControlGroup
        label={`${countActiveFilters(searchState)} CATEGORIES SELECTED`}
        clearButton={{
          title: 'CLEAR ALL',
          onPress: () => setSearchState?.({ ...searchState, filter: {} }),
        }}
        applyButton={{ title: 'APPLY ALL FILTERS', onPress: applyAllFilters }}
      />
    </Background>
  )
}
