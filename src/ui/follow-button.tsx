/**
 * Author: Edward Jones
 */
import React, { FC, useState } from 'react'
import { Button } from '@ui-kitten/components'
import { useMutation } from '@apollo/client'
import { FollowUser, UnfollowUser } from '@greeneggs/types/graphql'
import { Mutations, Queries } from '@greeneggs/graphql'

interface FollowButtonProps {
  userId: string
  isFollowing: boolean
}

/**
 * Button that when pressed, follows or unfollows a user.
 * Uses local state to improve responsiveness.
 */
export const FollowButton: FC<FollowButtonProps> = ({ userId, isFollowing }) => {
  const [isFollowingState, setIsFollowingState] = useState(isFollowing)
  const [followUser] = useMutation<FollowUser>(Mutations.FOLLOW_USER, {
    variables: {
      userId,
    },
    refetchQueries: [Queries.GET_PROFILE, 'profile'],
  })

  const [unfollowUser] = useMutation<UnfollowUser>(Mutations.UNFOLLOW_USER, {
    variables: {
      userId,
    },
    refetchQueries: [Queries.GET_PROFILE, 'profile'],
  })

  function handleFollowUser() {
    setIsFollowingState(true)
    followUser().catch(() => {
      // Undo local state change if mutation fails
      setIsFollowingState(false)
    })
  }

  function handleUnfollowUser() {
    setIsFollowingState(false)
    unfollowUser().catch(() => {
      // Undo local state change if mutation fails
      setIsFollowingState(true)
    })
  }

  return (
    <Button
      size='small'
      onPress={isFollowingState ? () => handleUnfollowUser() : () => handleFollowUser()}
    >
      {isFollowingState ? 'UNFOLLOW' : 'FOLLOW'}
    </Button>
  )
}
