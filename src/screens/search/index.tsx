/**
 * Author: Victor Ying
 */
import { Queries } from '@greeneggs/graphql'
import React, { useContext, useState, ReactElement } from 'react'
import {
  RecipeFilter,
  recipes,
  recipesVariables,
  recipes_recipes_data,
  Sort,
  Users,
  UsersVariables,
  Users_users_data,
} from '@greeneggs/types/graphql'
import { useNavigation } from '@react-navigation/core'
import { View } from 'react-native'
import { SearchContext, ISearchContext } from '@greeneggs/context'
import { Divider, IndexPath, SelectItem, Tab, TabBar } from '@ui-kitten/components'
import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import { LoggedInNavigationProp } from '@greeneggs/navigation/types'
import { Background } from '@greeneggs/ui/background'
import { LazyList } from '@greeneggs/ui/lazy-list'
import { RecipeCardSmall } from '@greeneggs/ui/cards'
import { UserListItem } from '../profile/user-list-item'
import { Select } from '@greeneggs/ui/select'

// eslint-disable-next-line @typescript-eslint/naming-convention
const { Navigator, Screen } = createMaterialTopTabNavigator()

/**
 * Shows a list of recipes as the result of a search
 */
export function RecipeSearch() {
  const navigation = useNavigation<LoggedInNavigationProp>()
  const { searchState } = useContext<ISearchContext>(SearchContext)
  return (
    <Background>
      <LazyList<recipes, recipesVariables, recipes_recipes_data, Sort, RecipeFilter>
        style={{ paddingTop: 16 }}
        query={Queries.getRecipes}
        variables={{
          query: searchState.query,
          sort: searchState.sort ?? Sort.NEW,
          filter: searchState.filter,
        }}
        dataKey='recipes'
        emptyMessage="Couldn't find any recipes."
        renderItem={({ item: myRecipe }) => (
          <View style={{ marginBottom: 16, marginHorizontal: 16 }}>
            <RecipeCardSmall
              recipe={myRecipe}
              onPress={() =>
                navigation.navigate('Recipe', {
                  recipeId: myRecipe.id,
                })
              }
            />
          </View>
        )}
      />
    </Background>
  )
}

/**
 * Shows a list of users as the result of a search
 */
function UserSearch() {
  const { searchState } = useContext<ISearchContext>(SearchContext)
  return (
    <Background>
      <LazyList<Users, UsersVariables, Users_users_data, Sort, RecipeFilter>
        style={{ paddingTop: 16 }}
        query={Queries.getUsers}
        variables={{
          query: searchState.query,
          sort: searchState.sort ?? Sort.NEW,
        }}
        dataKey='users'
        emptyMessage="Couldn't find any users."
        renderItem={({ item: user }) => (
          <>
            <UserListItem user={user} />
            <Divider />
          </>
        )}
      />
    </Background>
  )
}

/**
 * Tabs that can be switched between to show search results for recipes or users.
 */
export function SearchTabBar({ navigation, state }: MaterialTopTabBarProps): ReactElement {
  return (
    <TabBar selectedIndex={state.index} onSelect={(index) => navigation.navigate(state.routeNames[index])}>
      <Tab title='RECIPES' />
      <Tab title='USERS' />
    </TabBar>
  )
}

/**
 * Screen for searching recipes and users.
 */
export function Search() {
  const { searchState, setSearchState } = useContext<ISearchContext>(SearchContext)
  const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(
    new IndexPath(Object.values(Sort).indexOf(searchState.sort))
  )

  function getSortFromIndex(index: IndexPath | IndexPath[]): Sort {
    return Object.values(Sort)[(!Array.isArray(index) && index.row) || 0]
  }

  function onSelect(index: IndexPath | IndexPath[]) {
    setSearchState?.({ ...searchState, sort: getSortFromIndex(index) })
    setSelectedIndex(index)
  }

  return (
    <Navigator
      tabBar={(props: MaterialTopTabBarProps) => (
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 16,
          }}
        >
          <View style={{ flex: 1 }}>
            <SearchTabBar {...props} />
          </View>
          <Select
            style={{ flexGrow: 1, maxWidth: 150, marginLeft: 16 }}
            selectedIndex={selectedIndex}
            onSelect={onSelect}
            value={getSortFromIndex(selectedIndex)}
          >
            {Object.values(Sort).map((sortType) => (
              <SelectItem title={sortType} key={sortType} />
            ))}
          </Select>
        </View>
      )}
    >
      <Screen name='RECIPES' component={RecipeSearch} />
      <Screen name='USERS' component={UserSearch} />
    </Navigator>
  )
}
