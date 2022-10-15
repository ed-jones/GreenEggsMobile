/**
 * Author: Edward Jones
 */
import React, { ReactElement, useContext } from 'react'
import { Background } from '@greeneggs/ui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View } from 'react-native'
import { SearchContext } from '@greeneggs/providers/search-state-provider'

import { HomeTabs } from './home-tabs'
import { Search } from '../search'
import { TopBar } from '../search/common/top-bar'

/**
 * Home view that displays tabs for trending, news feed and categories. Also contains the search bar that when typed into, initiates the search screen.
 */
export const Home = (): ReactElement => {
  const insets = useSafeAreaInsets()
  const { searchState } = useContext(SearchContext)

  return (
    <Background>
      <View style={{ paddingTop: insets.top }}>
        <TopBar />
      </View>
      {searchState.query === undefined ? <HomeTabs /> : <Search />}
    </Background>
  )
}
