/**
 * Author: Edward Jones
 */
import React, { FC, useContext, useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Mutations } from '@greeneggs/graphql'
import { LikeRecipe, UnlikeRecipe } from '@greeneggs/types/graphql'
import { UserContext } from '@greeneggs/providers'
import { LikeCounter } from './like-counter'

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
export const CommentLikeCounter: FC<CommentLikeCounterProps> = ({
  likeCount,
  commentId,
  liked,
  submittedById,
  disabled,
}) => {
  // Use local state for instant feedback on slow networks
  const { me } = useContext(UserContext)

  const [likeComment] = useMutation<LikeRecipe>(Mutations.LIKE_COMMENT, {
    variables: {
      commentId,
    },
  })

  const [unlikeComment] = useMutation<UnlikeRecipe>(Mutations.UNLIKE_COMMENT, {
    variables: {
      commentId,
    },
  })

  return (
    <LikeCounter
      onLike={likeComment}
      onUnlike={unlikeComment}
      disabled={disabled ?? submittedById === me?.id}
      liked={liked}
      likeCount={likeCount}
    />
  )
}
