/**
 * Author: Dimitri Zvolinski
 */
import React, { ReactElement } from 'react'
import { recipe_recipe_data_ingredients } from '@greeneggs/types/graphql'
import { View, StyleSheet } from 'react-native'
import { Divider, List } from '@ui-kitten/components'
import { TopNavigation, Background, IngredientListItem } from '@greeneggs/ui'
import { RouteProp, useRoute } from '@react-navigation/native'

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
})

type RecipeAllIngredientsRoute = RouteProp<
  { params: { ingredients: recipe_recipe_data_ingredients[]; multiplier: number } },
  'params'
>

/**
 * Screen that displays a list of all ingredients for a recipe.
 */
export const RecipeAllIngredients = (): ReactElement => {
  const route = useRoute<RecipeAllIngredientsRoute>()
  const { ingredients, multiplier } = route.params

  return (
    <Background>
      <TopNavigation title='All Ingredients' />
      <View style={{ ...styles.content, marginHorizontal: -16 }}>
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
