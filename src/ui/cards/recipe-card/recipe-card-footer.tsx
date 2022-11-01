/**
 * Author: Edward Jones
 */
import React, { ReactElement } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import { CommentCounter, LabelledIcon, RecipeLikeCounter } from '@greeneggs/ui'
import { recipes_recipes_data } from '@greeneggs/types/graphql'
import { convertTimeEstimate, convertSubmittedAt } from '@greeneggs/utils'

const styles = StyleSheet.create({
  view: {
    padding: 14,
  },
  recipeTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    flexShrink: 1,
  },
  recipeDescription: {
    marginBottom: 16,
    marginTop: 8,
  },
  labelledIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelledIconGroup: {
    flexDirection: 'row',
  },
})

export type IRecipeCardFooterProps = Pick<
  recipes_recipes_data,
  | 'title'
  | 'description'
  | 'commentCount'
  | 'likeCount'
  | 'createdAt'
  | 'servingCount'
  | 'timeEstimate'
  | 'liked'
  | 'id'
  | 'comments'
  | 'submittedBy'
>

/**
 * Footer component for the main recipe card.
 * Displays meta information such as title, description and statistics.
 */
export function RecipeCardFooter({
  title,
  description,
  commentCount,
  likeCount,
  timeEstimate,
  createdAt,
  liked,
  id,
  comments,
  submittedBy,
}: IRecipeCardFooterProps): ReactElement {
  return (
    <View style={styles.view}>
      <View style={styles.labelledIcons}>
        <Text category='h1' style={styles.recipeTitle}>
          {title}
        </Text>
        <Text style={{ marginLeft: 8 }}>{`${convertSubmittedAt(createdAt)} ago`}</Text>
      </View>
      {description ? (
        <Text category='s1' numberOfLines={2} style={styles.recipeDescription}>
          {description}
        </Text>
      ) : undefined}
      <View style={styles.labelledIcons}>
        {timeEstimate && (
          <View style={styles.labelledIconGroup}>
            <LabelledIcon label={`${convertTimeEstimate(timeEstimate).toUpperCase()} PREP`} iconName='clock-outline' />
          </View>
        )}
        <View style={styles.labelledIconGroup}>
          <RecipeLikeCounter likeCount={likeCount} liked={liked} recipeId={id} submittedById={submittedBy.id} />
          <CommentCounter commentCount={commentCount} comments={comments} />
        </View>
      </View>
    </View>
  )
}
