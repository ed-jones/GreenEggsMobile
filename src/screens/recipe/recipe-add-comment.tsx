/**
 * Author: Dimitri Zvolinski
 */
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
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
import { Input } from '@greeneggs/ui'
import { useApolloClient, useQuery } from '@apollo/client'
import { LoadingScreen } from '../loading-screen'

const styles = StyleSheet.create({
  view: {
    padding: 16,
  },
  buttonGroup: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  heading: {
    paddingVertical: 16,
  },
  input: {
    marginBottom: 10,
    flex: 1,
  },
  avatar: {
    marginRight: 10,
  },
})

interface RecipeAddCommentProps {
  recipeId?: string
  commentId?: string
  isReply?: boolean
  active?: boolean
}

/**
 * Input component for adding a recipe comment.
 */
export function RecipeAddComment({ recipeId, commentId, isReply, active }: RecipeAddCommentProps) {
  const [comment, setComment] = useState<string>('')
  const client = useApolloClient()
  const { loading, error, data } = useQuery<Me>(Queries.ME)
  if (loading) return <LoadingScreen />
  if (error) {
    return <Text>Error! {error.message}</Text>
  }
  const me = data?.me.data

  function handleSubmit() {
    if (recipeId) {
      client
        .mutate<AddRecipeComment, AddRecipeCommentVariables>({
          mutation: Mutations.ADD_RECIPE_COMMENT,
          variables: {
            comment,
            recipeId,
          },
          refetchQueries: [Queries.GET_RECIPE, 'recipe'],
        })
        .then(() => {
          client.query<recipe>({
            query: Queries.GET_RECIPE,
            variables: {
              recipeId,
            },
          })
        })
    }
    if (commentId) {
      client.mutate<AddRecipeCommentReply, AddRecipeCommentReplyVariables>({
        mutation: Mutations.ADD_RECIPE_COMMENT_REPLY,
        variables: {
          comment,
          commentId,
        },
        refetchQueries: [Queries.GET_RECIPE, 'recipe'],
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
          <Avatar
            size='small'
            source={me?.avatarURI ? { uri: me?.avatarURI } : noAvatar}
            style={styles.avatar}
          />
        </View>
        <Input
          autoFocus={active}
          style={styles.input}
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
