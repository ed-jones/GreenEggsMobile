/**
 * Author: Dimitri Zvolinski
 */
import React, { ReactElement } from 'react'
import { RecipeCommentList } from './recipe-comment-list'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Text } from '@ui-kitten/components'
import { TopNavigation } from '@greeneggs/ui'
import { recipe_recipe_data_comments } from '@greeneggs/types/graphql'
import { RouteProp, useRoute } from '@react-navigation/native'

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
})

type RecipeAllCommentsRoute = RouteProp<
  { params: { comments: recipe_recipe_data_comments[]; commentCount: number; isReply: boolean } },
  'params'
>

/**
 * Screen that displays a list of all comments for a recipe.
 */
export function RecipeAllComments(): ReactElement {
  const route = useRoute<RecipeAllCommentsRoute>()
  const { comments, commentCount, isReply } = route.params

  return (
    <>
      <TopNavigation title={`All ${isReply ? 'Replies' : 'Comments'}`} />
      <ScrollView>
        <View style={styles.content}>
          <Text style={{ marginBottom: 24 }} category='h5'>{`All ${
            isReply ? 'Replies' : 'Comments'
          } (${commentCount})`}</Text>
          <RecipeCommentList comments={comments} />
        </View>
      </ScrollView>
    </>
  )
}
