/**
 * Author: Edward Jones
 */
import React, { useContext } from 'react'
import { useMutation } from '@apollo/client'
import { Mutations } from '@greeneggs/graphql'
import { LikeRecipe, UnlikeRecipe } from '@greeneggs/types/graphql'
import { LikeCounter } from './like-counter'
import { UserContext } from '@greeneggs/context'

interface CommentLikeCounterProps {
  likeCount: number
  commentId: string
  liked: boolean
  submittedById: string
  disabled?: boolean
}

/**
 * Displays the number of likes for a comment.
 * Links to the commenter profile.
 * Enables the liking of comments. Uses local state for better responsiveness.
 */
export function CommentLikeCounter({ likeCount, commentId, liked, submittedById, disabled }: CommentLikeCounterProps) {
  // Use local state for instant feedback on slow networks
  const { me } = useContext(UserContext)

  const [likeComment] = useMutation<LikeRecipe>(Mutations.likeComment, {
    variables: {
      commentId,
    },
  })

  const [unlikeComment] = useMutation<UnlikeRecipe>(Mutations.unlikeComment, {
    variables: {
      commentId,
    },
  })

  return (
    <LikeCounter
      onLike={async () => void (await likeComment())}
      onUnlike={async () => void (await unlikeComment())}
      disabled={disabled ?? submittedById === me?.id}
      liked={liked}
      likeCount={likeCount}
    />
  )
}
