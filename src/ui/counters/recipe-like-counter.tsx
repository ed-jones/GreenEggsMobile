/**
 * Author: Edward Jones
 */
import { useContext } from 'react';
import { useMutation } from '@apollo/client'
import { Mutations } from '@greeneggs/graphql'
import { LikeRecipe, UnlikeRecipe } from '@greeneggs/types/graphql'
import { LikeCounter } from './like-counter'
import { UserContext } from '@greeneggs/context'

interface RecipeLikeCounterProps {
  likeCount: number
  recipeId: string
  liked: boolean
  submittedById: string
  disabled?: boolean
}

/**
 * Displays number of likes and allows for liking of a recipe.
 */
export function RecipeLikeCounter({ likeCount, recipeId, liked, submittedById, disabled }: RecipeLikeCounterProps) {
  // Use local state for instant feedback on slow networks
  const { me } = useContext(UserContext)

  const [likeRecipe] = useMutation<LikeRecipe>(Mutations.likeRecipe, {
    variables: {
      recipeId,
    },
  })

  const [unlikeRecipe] = useMutation<UnlikeRecipe>(Mutations.unlikeRecipe, {
    variables: {
      recipeId,
    },
  })

  return (
    <LikeCounter
      onLike={async () => void (await likeRecipe())}
      onUnlike={async () => void (await unlikeRecipe())}
      disabled={disabled ?? submittedById === me?.id}
      liked={liked}
      likeCount={likeCount}
    />
  )
}
