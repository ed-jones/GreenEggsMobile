/**
 * Author: Edward Jones
 */
import React, { FC, useContext, useState } from 'react'
import { AlphabetType, Background, Icons, Input, LazyListAlpha, TopNavigation } from '@greeneggs/ui'
import {
  Categories,
  CategoriesVariables,
  Categories_categories_data,
  CategoryInput,
  RecipeFilter,
  Sort,
} from '@greeneggs/types/graphql'
import { Button, Divider, ListItem } from '@ui-kitten/components'
import { Queries } from '@greeneggs/graphql'
import { AddRecipeContext } from '@greeneggs/providers'
import { useNavigation } from '@react-navigation/core'
import { toTitleCase } from '@greeneggs/utils'

/**
 * Screen with an infinite scrolling alphabetised list of categories that
 * can be selected and added to a new recipe.
 */
export const PickCategory: FC = () => {
  const [query, setQuery] = useState('')
  const { categoriesFieldArray } = useContext(AddRecipeContext)
  const navigation = useNavigation()

  function pick(category: CategoryInput) {
    categoriesFieldArray?.append(category)
    navigation.goBack()
  }

  return (
    <Background>
      <TopNavigation title='Choose a category' />
      <Input
        style={{ padding: 16 }}
        placeholder='Search categories...'
        accessoryLeft={Icons.Search}
        onChangeText={setQuery}
        value={query}
        autoFocus
      />
      <LazyListAlpha<
        Categories,
        CategoriesVariables,
        Categories_categories_data,
        Sort,
        RecipeFilter
      >
        renderItem={(item) => (
          <>
            <ListItem
              title={item.name}
              onPress={() => {
                pick({ name: item.name })
              }}
            />
            <Divider />
          </>
        )}
        categoriseItem={(item) => item.name[0].toLowerCase() as AlphabetType}
        query={Queries.GET_CATEGORIES}
        ListFooterComponent={
          query.length > 0 ? (
            <Button
              style={{ marginHorizontal: 16, marginTop: 16 }}
              onPress={() => pick({ name: toTitleCase(query) })}
            >
              {`CREATE "${query.toUpperCase()}"`}
            </Button>
          ) : undefined
        }
        variables={{
          query,
        }}
        dataKey='categories'
      />
    </Background>
  )
}
