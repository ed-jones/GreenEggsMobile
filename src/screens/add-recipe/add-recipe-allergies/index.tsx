/**
 * Author: Edward Jones
 */
import React, { ReactElement, useContext } from 'react'
import { ListItem } from '@ui-kitten/components'
import { Icons } from '@greeneggs/ui'
import { AddRecipePartTemplate } from '../add-recipe-part-template'
import { useNavigation } from '@react-navigation/native'
import { AddRecipeContext } from '@greeneggs/providers'
import { LoggedInNavigationProp } from '@greeneggs/navigation/routes/logged-in-routes'

/**
 * Screen that shows a list of all allergies that will
 * be added to a recipe.
 */
export function AddRecipeAllergies(): ReactElement {
  const { allergiesFieldArray } = useContext(AddRecipeContext)

  const navigation = useNavigation<LoggedInNavigationProp>()

  return (
    <AddRecipePartTemplate
      title='Allergies'
      createButtonTitle='ADD ALLERGIES'
      onPressCreate={() => navigation.navigate('CreateAllergy')}
      emptyStateTitle='No allergies'
      emptyStateDescription='Add any potential allergies your recipe may trigger.'
      listItem={({ item, index }) => (
        <>
          <ListItem
            title={item.name}
            accessoryRight={(props) => <Icons.Cross {...props} onPress={() => allergiesFieldArray?.remove(index)} />}
          />
        </>
      )}
      data={allergiesFieldArray?.fields}
    />
  )
}
