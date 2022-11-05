/**
 * Author: Victor Ying
 */
import { useContext } from 'react';
import { Button, Icon, ThemedComponentProps, TopNavigationAction } from '@ui-kitten/components'
import { Input } from '@greeneggs/ui/input'
import * as Icons from '@greeneggs/ui/icons'
import { View, Image } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { logo } from '@greeneggs/assets'

import { countActiveFilters } from '../recipe-search-filter'
import { CountCircle } from './count-circle'
import { LoggedInNavigationProp } from '@greeneggs/navigation/types'
import { SearchContext } from '@greeneggs/context'

/**
 * Search bar and associated buttons displayed on the home page and search page.
 */
export function TopBar({ eva }: ThemedComponentProps) {
  const navigation = useNavigation<LoggedInNavigationProp>()
  const { searchState, setSearchState } = useContext(SearchContext)
  const setQuery = (query: string | undefined) => setSearchState?.({ ...searchState, query })

  return (
    <View style={{ backgroundColor: 'transparent', padding: 16, flexDirection: 'row', alignItems: 'center' }}>
      {searchState.query === undefined ? (
        <Image source={logo} style={{ width: 48, height: 48, marginRight: 16 }} />
      ) : (
        <TopNavigationAction icon={Icons.Back} onPress={() => setQuery(undefined)} />
      )}
      <Input
        placeholder='Search recipes or users...'
        size='large'
        style={{ marginRight: 16, flex: 1 }}
        accessoryLeft={(props) => <Icon style={{ width: 24, height: 24 }} name='search' {...props} />}
        value={searchState.query}
        onChangeText={setQuery}
      />
      {searchState.query !== undefined && (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          {countActiveFilters(searchState) > 0 && (
            <CountCircle style={{ position: 'absolute', zIndex: 1, marginTop: -6 }}>
              {countActiveFilters(searchState)}
            </CountCircle>
          )}
          <Button
            style={{ width: 50 }}
            accessoryLeft={(props) => <Icons.Filter {...props} fill={eva?.theme?.['color-primary-800']} />}
            status='basic'
            onPress={() => navigation.navigate('RecipeSearchFilter')}
          />
        </View>
      )}
    </View>
  )
}
