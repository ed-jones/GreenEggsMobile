/**
 * Author: Dimitri Zvolinski
 */
import React, { ReactElement } from 'react'
import { RecipeCommentList } from './recipe-comment-list'
import { View, ScrollView } from 'react-native'
import { Text } from '@ui-kitten/components'
import { TopNavigation } from '@greeneggs/ui/top-navigation'
import { RouteProp, useRoute } from '@react-navigation/native'
import { LoggedInRouteParams } from '@greeneggs/navigation/types'

/**
 * Screen that displays a list of all comments for a recipe.
 */
export function RecipeAllComments(): ReactElement {
  const route = useRoute<RouteProp<LoggedInRouteParams, 'RecipeAllComments'>>()
  const { comments, commentCount, isReply } = route.params

  return (
    <>
      <TopNavigation title={`All ${isReply ? 'Replies' : 'Comments'}`} />
      <ScrollView>
        <View style={{ padding: 16 }}>
          <Text style={{ marginBottom: 24 }} category='h5'>{`All ${
            isReply ? 'Replies' : 'Comments'
          } (${commentCount})`}</Text>
          <RecipeCommentList comments={comments} />
        </View>
      </ScrollView>
    </>
  )
}
