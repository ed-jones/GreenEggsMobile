/**
 * Author: Edward Jones
 */
import React, { useState } from 'react'
import { Queries } from '@greeneggs/graphql'
import {
  Categories,
  CategoriesVariables,
  Categories_categories_data,
  RecipeFilter,
  Sort,
} from '@greeneggs/types/graphql'
import { ListItem } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/core'
import { LoggedInNavigationProp } from '@greeneggs/navigation/types'
import { Background } from '@greeneggs/ui/background'
import { TopNavigation } from '@greeneggs/ui/top-navigation'
import { Input } from '@greeneggs/ui/input'
import * as Icons from '@greeneggs/ui/icons'
import { LazyListAlpha } from '@greeneggs/ui/lazy-alpha-list'
import { AlphabetType } from '@greeneggs/ui/alpha-list'

/**
 * Displays a searchable infinite scrolling list of all categories within the app, and links to associated category views.
 */
export function AllCategories() {
  const [query, setQuery] = useState('')
  const navigation = useNavigation<LoggedInNavigationProp>()
  return (
    <Background>
      <TopNavigation title='All Categories' />
      <Input
        placeholder='Search categories'
        size='large'
        accessoryLeft={Icons.Search}
        value={query}
        onChangeText={setQuery}
        style={{ padding: 16 }}
      />
      <LazyListAlpha<Categories, CategoriesVariables, Categories_categories_data, Sort, RecipeFilter>
        renderItem={(item) => (
          <ListItem
            title={item.name}
            onPress={() =>
              navigation.navigate('Category', {
                categoryId: item.id,
                categoryName: item.name,
              })
            }
          />
        )}
        categoriseItem={(item) => item.name[0].toLowerCase() as AlphabetType}
        query={Queries.getCategories}
        variables={{
          query,
        }}
        dataKey='categories'
      />
    </Background>
  )
}
