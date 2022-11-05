/**
 * Author: Edward Jones
 */
import React, { ReactElement, useContext, useState } from 'react'
import { Divider, ListItem } from '@ui-kitten/components'
import {
  Allergies,
  AllergiesVariables,
  Allergies_allergies_data,
  AllergyInput,
  RecipeFilter,
  Sort,
} from '@greeneggs/types/graphql'
import { Queries } from '@greeneggs/graphql'
import { useNavigation } from '@react-navigation/core'
import { AddRecipeContext } from '@greeneggs/context'
import { Background } from '@greeneggs/ui/background'
import { TopNavigation } from '@greeneggs/ui/top-navigation'
import { Input } from '@greeneggs/ui/input'
import { LazyListAlpha } from '@greeneggs/ui/lazy-alpha-list'
import * as Icons from '@greeneggs/ui/icons'
import { AlphabetType } from '@greeneggs/ui/alpha-list'

/**
 * Screen with an infinite scrolling alphabetised list of allergies that
 * can be selected and added to a new recipe.
 */
export function CreateAllergy(): ReactElement {
  const [query, setQuery] = useState('')
  const { allergiesFieldArray } = useContext(AddRecipeContext)
  const navigation = useNavigation()

  function pick(allergy: AllergyInput) {
    allergiesFieldArray?.append(allergy)
    navigation.goBack()
  }

  return (
    <Background>
      <TopNavigation title='Choose an allergy' />
      <Input
        style={{ padding: 16 }}
        placeholder='Search allergies...'
        accessoryLeft={Icons.Search}
        onChangeText={setQuery}
        value={query}
        autoFocus
      />
      <LazyListAlpha<Allergies, AllergiesVariables, Allergies_allergies_data, Sort, RecipeFilter>
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
        query={Queries.getAllergies}
        variables={{
          query,
        }}
        dataKey='allergies'
      />
    </Background>
  )
}
