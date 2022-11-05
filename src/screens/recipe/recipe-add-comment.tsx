/**
 * Author: Dimitri Zvolinski
 */
import { ReactElement, useState } from 'react';
import { View } from 'react-native'
import { Mutations, Queries } from '@greeneggs/graphql'
import { noAvatar } from '@greeneggs/assets'
import {
  AddRecipeComment,
  AddRecipeCommentReply,
  AddRecipeCommentReplyVariables,
  AddRecipeCommentVariables,
  Me,
  recipe,
} from '@greeneggs/types/graphql'
import { Avatar, Button, Text } from '@ui-kitten/components'
import { Input } from '@greeneggs/ui/input'
import { useApolloClient, useQuery } from '@apollo/client'
import { LoadingScreen } from '../../ui/loading-screen'

interface RecipeAddCommentProps {
  recipeId?: string
  commentId?: string
  isReply?: boolean
  active?: boolean
}

/**
 * Input component for adding a recipe comment.
 */
export function RecipeAddComment({ recipeId, commentId, isReply, active }: RecipeAddCommentProps): ReactElement {
  const [comment, setComment] = useState<string>('')
  const client = useApolloClient()
  const { loading, error, data } = useQuery<Me>(Queries.getMe)
  if (loading) return <LoadingScreen />
  if (error) {
    return <Text>Error! {error.message}</Text>
  }
  const me = data?.me.data

  function handleSubmit() {
    if (recipeId) {
      void client
        .mutate<AddRecipeComment, AddRecipeCommentVariables>({
          mutation: Mutations.addRecipeComment,
          variables: {
            comment,
            recipeId,
          },
          refetchQueries: [Queries.getRecipe, 'recipe'],
        })
        .then(() => {
          void client.query<recipe>({
            query: Queries.getRecipe,
            variables: {
              recipeId,
            },
          })
        })
    }
    if (commentId) {
      void client.mutate<AddRecipeCommentReply, AddRecipeCommentReplyVariables>({
        mutation: Mutations.addRecipeCommentReply,
        variables: {
          comment,
          commentId,
        },
        refetchQueries: [Queries.getRecipe, 'recipe'],
      })
    }

    setComment('')
  }

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            height: '100%',
          }}
        >
          <Avatar size='small' source={me?.avatarURI ? { uri: me?.avatarURI } : noAvatar} style={{ marginRight: 10 }} />
        </View>
        <Input
          autoFocus={active}
          style={{ marginBottom: 10, flex: 1 }}
          numberOfLines={3}
          multiline
          textAlignVertical='top'
          placeholder={`Write a ${isReply ? 'reply' : 'comment'}...`}
          value={comment}
          onChangeText={(newValue) => setComment(newValue)}
        />
      </View>

      <Button onPress={handleSubmit}>{`POST ${isReply ? 'REPLY' : 'COMMENT'}`}</Button>
    </>
  )
}
