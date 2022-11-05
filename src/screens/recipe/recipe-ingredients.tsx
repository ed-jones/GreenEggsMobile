/**
 * Author: Dimitri Zvolinski
 */
import { ReactElement } from 'react'
import { recipe_recipe_data_ingredients } from '@greeneggs/types/graphql'
import { View } from 'react-native'
import { IngredientListItem } from '@greeneggs/ui/list-items'

interface Props {
  ingredients: recipe_recipe_data_ingredients[]
  servingCount?: number
  defaultServingCount?: number | null
}

/**
 * Component for displaying an abbreviated list of ingredients, with the option to view more in a new screen.
 */
export function RecipeIngredients({ ingredients, servingCount, defaultServingCount }: Props): ReactElement {
  let multiplier = 1
  if (servingCount && defaultServingCount) {
    multiplier = servingCount / defaultServingCount
  }
  return (
    <View style={{ marginHorizontal: -16 }}>
      {ingredients.map((ingredient: recipe_recipe_data_ingredients, index) => (
        <IngredientListItem
          ingredient={{
            ...ingredient,
            quantity: ingredient.quantity ? ingredient.quantity * multiplier : null,
          }}
          key={index.toString()}
        />
      ))}
    </View>
  )
}
