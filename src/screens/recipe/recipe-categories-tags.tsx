/**
 * Author: Dimitri Zvolinski
 */
import React, { ReactElement } from 'react'
import { Tags } from '@greeneggs/ui'
import { recipe_recipe_data_categories } from '@greeneggs/types/graphql'
import { useNavigation } from '@react-navigation/core'
import { LoggedInNavigationProp } from '@greeneggs/navigation/routes/logged-in-routes'

interface IRecipeCategoriesTags {
  categories: recipe_recipe_data_categories[]
}

/**
 * Component that displays a horizontal scrolling list of categories in the form of tags.
 */
export const RecipeCategoriesTags = ({ categories }: IRecipeCategoriesTags): ReactElement => {
  const navigation = useNavigation<LoggedInNavigationProp>()
  return (
    <Tags
      tags={categories.map((category) => ({
        name: category.name,
        onPress: () =>
          navigation.navigate('Category', {
            categoryId: category.id,
            categoryName: category.name,
          }),
      }))}
    />
  )
}
