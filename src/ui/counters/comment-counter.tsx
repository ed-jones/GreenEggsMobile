/**
 * Author: Edward Jones
 */
import React from 'react'
import { recipes_recipes_data_comments } from '@greeneggs/types/graphql'
import { useNavigation } from '@react-navigation/core'
import { LabelledIcon } from '../labelled-icon'
import { LoggedInNavigationProp } from '@greeneggs/navigation/routes/logged-in-routes'

interface CommentCounterProps {
  commentCount: number
  comments: recipes_recipes_data_comments[]
}

/**
 * Displays the number of comments on a post, and links to the list of comments
 */
export function CommentCounter({ commentCount, comments }: CommentCounterProps) {
  const navigation = useNavigation<LoggedInNavigationProp>()

  return (
    <LabelledIcon
      label={String(commentCount)}
      iconName='message-square-outline'
      onPress={() =>
        navigation.navigate('RecipeAllComments', {
          comments,
          commentCount,
          isReply: false,
          recipeId: '',
        })
      }
    />
  )
}
