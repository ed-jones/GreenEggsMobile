/**
 * Author: Edward Jones
 */
import React, { ReactElement, useContext } from 'react'
import { Divider, ListItem } from '@ui-kitten/components'
import { Icons } from '@greeneggs/ui'

import { AddRecipePartTemplate } from '../add-recipe-part-template'
import { useNavigation } from '@react-navigation/native'
import { AddRecipeContext } from '@greeneggs/providers'
import { LoggedInNavigationProp } from '@greeneggs/navigation/routes/logged-in-routes'

/**
 * Screen that shows a list of all selected categories that will
 * be added to a recipe.
 */
export function AddRecipeCategories(): ReactElement {
  const { categoriesFieldArray } = useContext(AddRecipeContext)
  const navigation = useNavigation<LoggedInNavigationProp>()

  return (
    <AddRecipePartTemplate
      title='Categories'
      createButtonTitle='ADD CATEGORY'
      onPressCreate={() => navigation.navigate('PickCategory')}
      emptyStateTitle='No categories'
      emptyStateDescription='Adding categories will help people find your recipe.'
      listItem={({ item, index }) => (
        <>
          <ListItem
            title={item.name}
            accessoryRight={(props) => <Icons.Cross {...props} onPress={() => categoriesFieldArray?.remove(index)} />}
          />
          <Divider />
        </>
      )}
      data={categoriesFieldArray?.fields}
    />
  )
}
