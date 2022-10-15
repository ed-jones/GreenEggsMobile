/**
 * Author: Edward Jones
 */
import React, { FC, useState } from 'react'
import { LabelledIcon, LabelledIconProps } from '../labelled-icon'

interface LikeCounterProps {
  likeCount: number
  liked: boolean
  onLike: () => Promise<void>
  onUnlike: () => Promise<void>
  disabled?: boolean
}

enum LikeCounterStates {
  LIKED,
  NOT_LIKED,
  DISABLED,
}

/**
 * Abstract component that displays number of likes and allows for liking of something.
 * Uses local state for better responsiveness.
 */
export const LikeCounter: FC<LikeCounterProps> = ({ likeCount, liked, onLike, onUnlike, disabled }) => {
  // Use local state for instant feedback on slow networks
  const [likeCounterState, setLikeCounterState] = useState(
    disabled ? LikeCounterStates.DISABLED : liked ? LikeCounterStates.LIKED : LikeCounterStates.NOT_LIKED
  )
  const [likeCountState, setLikeCountState] = useState(likeCount)

  function handleLikeRecipe() {
    setLikeCounterState(LikeCounterStates.LIKED)
    setLikeCountState(likeCountState + 1)
    onLike().catch(() => {
      // Undo local state change if mutation fails
      setLikeCounterState(LikeCounterStates.NOT_LIKED)
      setLikeCountState(likeCountState - 1)
    })
  }

  function handleUnlikeRecipe() {
    setLikeCounterState(LikeCounterStates.NOT_LIKED)
    setLikeCountState(likeCountState - 1)
    onUnlike().catch(() => {
      // Undo local state change if mutation fails
      setLikeCounterState(LikeCounterStates.LIKED)
      setLikeCountState(likeCountState + 1)
    })
  }

  const LIKE_COUNTER_STATE_PROP_MAP: Record<
    LikeCounterStates,
    Pick<LabelledIconProps, 'iconName' | 'fill' | 'onPress'>
  > = {
    [LikeCounterStates.LIKED]: {
      iconName: 'heart',
      fill: 'red',
      onPress: handleUnlikeRecipe,
    },
    [LikeCounterStates.NOT_LIKED]: {
      iconName: 'heart-outline',
      fill: 'black',
      onPress: handleLikeRecipe,
    },
    [LikeCounterStates.DISABLED]: {
      iconName: 'heart',
      fill: '#D1D5DB',
    },
  }

  return <LabelledIcon label={String(likeCountState)} {...LIKE_COUNTER_STATE_PROP_MAP[likeCounterState]} />
}
