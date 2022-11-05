/**
 * Author: Dimitri Zvolinski
 */
import { ReactElement, useContext } from 'react';
import { Mutations, Queries } from '@greeneggs/graphql'
import { noAvatar } from '@greeneggs/assets'
import { convertSubmittedAt } from '@greeneggs/utils'
import { ListItem, Button, Divider, Avatar, Icon } from '@ui-kitten/components'
import { View, Text, Alert, Pressable } from 'react-native'
import { DeleteComment, recipe_recipe_data_comments } from '@greeneggs/types/graphql'
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { useMutation } from '@apollo/client'

import { UserContext } from '@greeneggs/context'
import { useNavigateToProfile } from '@greeneggs/navigation/utils'
import { CommentLikeCounter } from '@greeneggs/ui/counters/comment-like-counter'
import { LabelledIcon } from '@greeneggs/ui/labelled-icon'

interface RecipeCommentProps {
  comment: recipe_recipe_data_comments
  replyButton?: boolean
}

/**
 * Component for displaying an individual recipe comment
 */
export function RecipeComment({ comment, replyButton }: RecipeCommentProps): ReactElement {
  const navigation: StackNavigationProp<Record<string, Record<string, unknown>>, string> = useNavigation()
  const navigateToProfile = useNavigateToProfile()

  const [deleteComment] = useMutation<DeleteComment>(Mutations.deleteComment, {
    variables: {
      commentId: comment.id,
    },
    refetchQueries: [Queries.getRecipe, 'recipe'],
  })

  const { me } = useContext(UserContext)

  function handleDeleteComment() {
    Alert.alert(
      'Delete comment',
      'This action cannot be undone',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'OK', onPress: () => void deleteComment() },
      ],
      { cancelable: false }
    )
  }

  return (
    <>
      <ListItem>
        <View style={{ flexDirection: 'column', padding: 10, width: '100%' }}>
          {!comment.deleted && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Pressable onPress={() => navigateToProfile(comment.submittedBy.id)}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Avatar
                      size='small'
                      source={comment.submittedBy.avatarURI ? { uri: comment.submittedBy.avatarURI } : noAvatar}
                      style={{ marginRight: 10 }}
                    />
                    <Text
                      style={{ fontWeight: 'bold' }}
                    >{`${comment.submittedBy.firstName} ${comment.submittedBy.lastName}`}</Text>
                  </View>
                </Pressable>
                <Text style={{ marginLeft: 6 }}>{convertSubmittedAt(comment.createdAt)} ago</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <CommentLikeCounter
                  likeCount={comment.likeCount}
                  commentId={comment.id}
                  liked={comment.liked}
                  submittedById={comment.submittedBy.id}
                />
                <LabelledIcon
                  label='REPLY'
                  iconName='message-square-outline'
                  onPress={() =>
                    navigation.navigate('RecipeCommentReplies', {
                      commentId: comment.id,
                      replying: true,
                    })
                  }
                />
                {me?.id === comment.submittedBy.id && (
                  <Icon
                    name='trash-2-outline'
                    fill='red'
                    style={{ width: 24, height: 24, marginRight: 8 }}
                    onPress={handleDeleteComment}
                  />
                )}
              </View>
            </View>
          )}
          <Text numberOfLines={2}>{comment.contents}</Text>
          {comment.replyCount > 0 && replyButton && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: 16,
              }}
            >
              <Button
                onPress={() =>
                  navigation.push('RecipeCommentReplies', {
                    commentId: comment.id,
                    replying: false,
                  })
                }
                size='small'
                status='basic'
                appearance='ghost'
              >{`REPLIES (${comment.replyCount.toString()})`}</Button>
            </View>
          )}
        </View>
      </ListItem>
      <Divider />
    </>
  )
}
