/**
 * Author: Edward Jones
 */
import { ReactElement } from 'react';
import { Image, View } from 'react-native'
import { Card } from '@ui-kitten/components'
import { recipes_recipes_data } from '@greeneggs/types/graphql'
import { imageNotFound } from '@greeneggs/assets'

import { RecipeCardHeader } from './recipe-card-header'
import { RecipeCardFooter } from './recipe-card-footer'

interface IRecipeCard {
  recipe: recipes_recipes_data
  onPress: () => void
}

/**
 * Displays recipe details in a card format with heavy emphasis on the cover image.
 * Used for trending and news feed.
 */
export function RecipeCard({ recipe, onPress }: IRecipeCard): ReactElement {
  return (
    <Card
      appearance='filled'
      style={{ borderRadius: 12 }}
      header={() => <RecipeCardHeader {...recipe.submittedBy} />}
      footer={() => <RecipeCardFooter {...recipe} />}
      onPress={onPress}
    >
      <View style={{ marginHorizontal: -24, marginVertical: -16 }}>
        <Image
          style={{ width: '100%', height: undefined, aspectRatio: 1 / 1, resizeMode: 'cover' }}
          source={recipe.coverImage ? { uri: recipe.coverImage } : imageNotFound}
        />
      </View>
    </Card>
  )
}
