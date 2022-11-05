/**
 * Author: Edward Jones
 */
import { ReactElement } from 'react';
import { View } from 'react-native'
import { Text } from '@ui-kitten/components'
import { recipes_recipes_data } from '@greeneggs/types/graphql'
import { convertTimeEstimate, convertSubmittedAt } from '@greeneggs/utils'
import { LabelledIcon } from '@greeneggs/ui/labelled-icon'
import { RecipeLikeCounter } from '@greeneggs/ui/counters/recipe-like-counter'
import { CommentCounter } from '@greeneggs/ui/counters/comment-counter'

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
    <View style={{ padding: 14 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text category='h1' style={{ fontWeight: 'bold', fontSize: 18, flexShrink: 1 }}>
          {title}
        </Text>
        <Text style={{ marginLeft: 8 }}>{`${convertSubmittedAt(createdAt)} ago`}</Text>
      </View>
      {description ? (
        <Text category='s1' numberOfLines={2} style={{ marginBottom: 16, marginTop: 8 }}>
          {description}
        </Text>
      ) : undefined}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        {timeEstimate && (
          <View style={{ flexDirection: 'row' }}>
            <LabelledIcon label={`${convertTimeEstimate(timeEstimate).toUpperCase()} PREP`} iconName='clock-outline' />
          </View>
        )}
        <View style={{ flexDirection: 'row' }}>
          <RecipeLikeCounter likeCount={likeCount} liked={liked} recipeId={id} submittedById={submittedBy.id} />
          <CommentCounter commentCount={commentCount} comments={comments} />
        </View>
      </View>
    </View>
  )
}
