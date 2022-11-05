/**
 * Author: Dimitri Zvolinski
 */
import React, { ReactElement } from 'react'
import { View } from 'react-native'
import { Divider, List } from '@ui-kitten/components'
import { RouteProp, useRoute } from '@react-navigation/native'
import { LoggedInRouteParams } from '@greeneggs/navigation/types'
import { Background } from '@greeneggs/ui/background'
import { TopNavigation } from '@greeneggs/ui/top-navigation'
import { IngredientListItem } from '@greeneggs/ui/list-items'

/**
 * Screen that displays a list of all ingredients for a recipe.
 */
export function RecipeAllIngredients(): ReactElement {
  const route = useRoute<RouteProp<LoggedInRouteParams, 'RecipeAllIngredients'>>()
  const { ingredients, multiplier } = route.params

  return (
    <Background>
      <TopNavigation title='All Ingredients' />
      <View style={{ padding: 16, marginHorizontal: -16 }}>
        <List
          data={ingredients}
          renderItem={({ item }) => (
            <IngredientListItem
              ingredient={{
                ...item,
                quantity: item.quantity ? item.quantity * multiplier : null,
              }}
            />
          )}
        />
        <Divider />
      </View>
    </Background>
  )
}
