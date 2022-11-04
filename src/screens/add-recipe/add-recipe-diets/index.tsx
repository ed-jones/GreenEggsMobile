/**
 * Author: Edward Jones
 */
import React, { ReactElement, useContext } from 'react'
import { ListItem } from '@ui-kitten/components'
import { Icons } from '@greeneggs/ui'

import { AddRecipePartTemplate } from '../add-recipe-part-template'
import { useNavigation } from '@react-navigation/native'
import { LoggedInNavigationProp } from '@greeneggs/navigation/routes/logged-in-routes'
import { AddRecipeContext } from '@greeneggs/providers/add-recipe-state-provider'

/**
 * Screen that shows a list of all selected diets that will
 * be added to a recipe.
 */
export function AddRecipeDiets(): ReactElement {
  const { dietsFieldArray } = useContext(AddRecipeContext)
  const navigation = useNavigation<LoggedInNavigationProp>()

  return (
    <AddRecipePartTemplate
      title='Diets'
      createButtonTitle='ADD DIET'
      onPressCreate={() => navigation.navigate('CreateDiet')}
      emptyStateTitle='No diets'
      emptyStateDescription='Let us know if your recipe satisfies any special diets.'
      listItem={({ item, index }) => (
        <>
          <ListItem
            title={item.name}
            accessoryRight={(props) => <Icons.Cross {...props} onPress={() => dietsFieldArray?.remove(index)} />}
          />
        </>
      )}
      data={dietsFieldArray?.fields}
    />
  )
}
