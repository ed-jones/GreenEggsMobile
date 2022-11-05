/**
 * Author: Edward Jones
 */
import React, { ReactElement, useContext, useState } from 'react'
import { Divider, Input, ListItem, TopNavigation } from '@ui-kitten/components'
import { DietInput, Diets, DietsVariables, Diets_diets_data, RecipeFilter, Sort } from '@greeneggs/types/graphql'
import { Queries } from '@greeneggs/graphql'
import { useNavigation } from '@react-navigation/core'
import { AddRecipeContext } from '@greeneggs/context'
import { AlphabetType } from '@greeneggs/ui/alpha-list'
import { Background } from '@greeneggs/ui/background'
import { LazyListAlpha } from '@greeneggs/ui/lazy-alpha-list'
import * as Icons from '@greeneggs/ui/icons'

/**
 * Screen that lets a user select a diet from an infinite scrolling alphabetised list
 * to add to a recipe.
 */
export function CreateDiet(): ReactElement {
  const [query, setQuery] = useState('')
  const { dietsFieldArray } = useContext(AddRecipeContext)
  const navigation = useNavigation()

  function pick(diet: DietInput) {
    dietsFieldArray?.append(diet)
    navigation.goBack()
  }

  return (
    <Background>
      <TopNavigation title='Choose a diet' />
      <Input
        style={{ padding: 16 }}
        placeholder='Search diets...'
        accessoryLeft={Icons.Search}
        onChangeText={setQuery}
        value={query}
        autoFocus
      />
      <LazyListAlpha<Diets, DietsVariables, Diets_diets_data, Sort, RecipeFilter>
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
        query={Queries.getDiets}
        variables={{
          query,
        }}
        dataKey='diets'
      />
    </Background>
  )
}
