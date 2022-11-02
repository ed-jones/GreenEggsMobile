/**
 * Author: Dimitri Zvolinski
 */
import React, { ReactElement } from 'react'
import { recipe_recipe_data_steps } from '@greeneggs/types/graphql'
import { ListItem } from '@ui-kitten/components'
import { Image, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { LoggedInNavigationProp } from '@greeneggs/navigation/routes/logged-in-routes'
import { Forward } from '@greeneggs/ui/icons'

interface IRecipeDirections {
  directions: recipe_recipe_data_steps[]
}

/**
 * Carousel for displaying recipe steps.
 */
export function RecipeDirections({ directions }: IRecipeDirections): ReactElement {
  const navigation = useNavigation<LoggedInNavigationProp>()

  return (
    <View style={{ marginHorizontal: -16 }}>
      {directions.map((direction) => (
        <ListItem
          key={direction.title}
          onPress={() => navigation.navigate('RecipeDirectionExpanded', { direction })}
          title={direction.title}
          description={<Text numberOfLines={1}>{direction.description}</Text>}
          accessoryRight={Forward}
          accessoryLeft={() => {
            return direction.image ? (
              <Image source={{ uri: direction.image }} style={{ width: 48, height: 48, marginHorizontal: 8 }} />
            ) : (
              <></>
            )
          }}
        />
      ))}
    </View>
  )
}
