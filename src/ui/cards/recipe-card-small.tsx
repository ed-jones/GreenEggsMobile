/**
 * Author: Edward Jones
 */
import { recipes_recipes_data } from '@greeneggs/types/graphql';
import { Card, Text } from '@ui-kitten/components'
import { View, Image } from 'react-native'
import { convertSubmittedAt } from '@greeneggs/utils'
import { imageNotFound } from '@greeneggs/assets'
import { RecipeLikeCounter } from '../counters/recipe-like-counter'
import { CommentCounter } from '../counters/comment-counter'

interface RecipeCardSmallProps {
  recipe: recipes_recipes_data
  onPress: () => void
}

/**
 * Displays recipes in a more compact form.
 * Designed to be used outside of trending and news feed.
 */
export function RecipeCardSmall({ recipe, onPress }: RecipeCardSmallProps) {
  return (
    <Card appearance='filled' style={{ borderRadius: 12 }} onPress={onPress}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
            paddingRight: 24,
          }}
        >
          <Text category='h6' numberOfLines={1}>
            {recipe.title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text
              category='s1'
              numberOfLines={1}
              style={{ flexShrink: 1 }}
            >{`${recipe.submittedBy.firstName} ${recipe.submittedBy.lastName}`}</Text>
            <Text style={{ marginLeft: 8 }}>{`${convertSubmittedAt(recipe.createdAt)} ago`}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
                alignItems: 'center',
                marginBottom: 8,
              }}
            >
              <RecipeLikeCounter
                likeCount={recipe.likeCount}
                liked={recipe.liked}
                recipeId={recipe.id}
                submittedById={recipe.submittedBy.id}
              />
              <CommentCounter commentCount={recipe.commentCount} comments={recipe.comments} />
            </View>
          </View>
        </View>
        <View style={{ marginHorizontal: -24, marginVertical: -16 }}>
          <Image
            style={{ width: undefined, height: 128, aspectRatio: 1, marginLeft: 16 }}
            source={recipe.coverImage ? { uri: recipe.coverImage } : imageNotFound}
          />
        </View>
      </View>
    </Card>
  )
}
