/**
 * Author: Edward Jones
 */
import { useState } from 'react';
import {
  IngredientInput,
  Ingredients,
  IngredientsVariables,
  Ingredients_ingredients_data,
  RecipeFilter,
  Sort,
} from '@greeneggs/types/graphql'
import { Button, Divider, Input, ListItem } from '@ui-kitten/components'
import { Queries } from '@greeneggs/graphql'
import { toTitleCase } from '@greeneggs/utils'
import { useNavigation } from '@react-navigation/core'
import { LoggedInNavigationProp } from '@greeneggs/navigation/types'
import { Background } from '@greeneggs/ui/background'
import { TopNavigation } from '@greeneggs/ui/top-navigation'
import { LazyListAlpha } from '@greeneggs/ui/lazy-alpha-list'
import * as Icons from '@greeneggs/ui/icons'
import { AlphabetType } from '@greeneggs/ui/alpha-list'

/**
 * Screen that shows an infinite scrolling list of all generic ingredients
 * in the database that a user can select from or create a new one to add to their recipe.
 */
export function PickIngredient() {
  const [query, setQuery] = useState('')
  const navigation = useNavigation<LoggedInNavigationProp>()

  function pick(ingredient: IngredientInput) {
    navigation.navigate('AddIngredientDetails', { name: ingredient.name })
  }

  return (
    <Background>
      <TopNavigation title='Pick an ingredient' />
      <Input
        style={{ padding: 16, backgroundColor: 'white' }}
        placeholder='Search ingredients...'
        accessoryLeft={Icons.Search}
        onChangeText={setQuery}
        value={query}
        autoFocus
      />
      <LazyListAlpha<Ingredients, IngredientsVariables, Ingredients_ingredients_data, Sort, RecipeFilter>
        renderItem={(item) => (
          <>
            <ListItem title={item.name} onPress={() => pick(item)} />
            <Divider />
          </>
        )}
        categoriseItem={(item) => item.name[0].toLowerCase() as AlphabetType}
        query={Queries.getIngredients}
        ListFooterComponent={
          query.length > 0 ? (
            <Button style={{ marginHorizontal: 16, marginTop: 16 }} onPress={() => pick({ name: toTitleCase(query) })}>
              {`CREATE "${query.toUpperCase()}"`}
            </Button>
          ) : undefined
        }
        variables={{
          query,
        }}
        dataKey='ingredients'
      />
    </Background>
  )
}
