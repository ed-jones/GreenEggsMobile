/**
 * Author: Edward Jones
 */
import { ReactElement, useContext } from 'react'
import { IngredientListItem } from '@greeneggs/ui/list-items'
import { useEffect } from 'react'

import { AddRecipePartTemplate } from '../add-recipe-part-template'
import { RecipeForm } from '../add-recipe'
import { useNavigation } from '@react-navigation/native'
import { AddRecipeContext } from '@greeneggs/context'
import { LoggedInNavigationProp } from '@greeneggs/navigation/types'

interface Props {
  form: RecipeForm
}

/**
 * Screen that shows a list of all ingredients that will be added to a recipe.
 */
export function AddRecipeIngredients({ form }: Props): ReactElement {
  const { ingredientsFieldArray } = useContext(AddRecipeContext)
  const navigation = useNavigation<LoggedInNavigationProp>()

  const ingredientsLength = ingredientsFieldArray?.fields?.length || 0
  useEffect(() => {
    if (ingredientsLength > 0) {
      form.clearErrors('ingredients')
    }
  }, [ingredientsLength])

  return (
    <AddRecipePartTemplate
      title='Ingredients'
      createButtonTitle='ADD INGREDIENT'
      onPressCreate={() => navigation.navigate('PickIngredient')}
      emptyStateTitle='No ingredients'
      emptyStateDescription='Make sure to add any ingredients this recipe might need.'
      listItem={({ item, index }) =>
        item ? (
          <IngredientListItem
            ingredient={{ ...item, __typename: 'Ingredient' }}
            remove={() => ingredientsFieldArray?.remove(index)}
          />
        ) : null
      }
      data={ingredientsFieldArray?.fields}
    />
  )
}
