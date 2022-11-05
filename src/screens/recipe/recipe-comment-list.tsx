/**
 * Author: Dimitri Zvolinski
 */
import { ReactElement } from 'react';
import { Divider } from '@ui-kitten/components'
import { View } from 'react-native'
import { recipe_recipe_data_comments, recipe_recipe_data_comments_replies } from '@greeneggs/types/graphql'
import { RecipeComment } from './recipe-comment'

interface RecipeCommentListProps {
  comments: recipe_recipe_data_comments[] | recipe_recipe_data_comments_replies[]
}

/**
 * Component that generates a list of comments.
 */
export function RecipeCommentList({ comments }: RecipeCommentListProps): ReactElement {
  return (
    <View style={{ marginHorizontal: -16 }}>
      {(comments as unknown as recipe_recipe_data_comments[]).map((comment) => (
        <RecipeComment comment={comment} replyButton key={comment.id} />
      ))}
      <Divider />
    </View>
  )
}
