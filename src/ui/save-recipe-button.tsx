/**
 * Author: Edward Jones
 */
import React, { FC, useState } from 'react'
import { Icon, TopNavigationAction } from '@ui-kitten/components'
import { useMutation } from '@apollo/client'
import { Mutations, Queries } from '@greeneggs/graphql'

interface SaveRecipeButtonProps {
  recipeId: string | null
  saved: boolean
}

/**
 * Icon button that when pressed triggers the recipe to be saved. Uses local state to improve responsiveness.
 */
export const SaveRecipeButton: FC<SaveRecipeButtonProps> = ({ recipeId, saved }) => {
  const [savedState, setSavedState] = useState(saved)

  const [saveRecipe] = useMutation(Mutations.SAVE_RECIPE, {
    variables: { recipeId },
    refetchQueries: [Queries.GET_RECIPE, 'recipe', Queries.GET_SAVED_RECIPES],
  })

  const [unsaveRecipe] = useMutation(Mutations.UNSAVE_RECIPE, {
    variables: { recipeId },
    refetchQueries: [Queries.GET_RECIPE, 'recipe', Queries.GET_SAVED_RECIPES],
  })

  function handleSaveRecipe() {
    setSavedState(true)
    saveRecipe().catch(() => setSavedState(false))
  }

  function handleUnsaveRecipe() {
    setSavedState(false)
    unsaveRecipe().catch(() => setSavedState(true))
  }

  return (
    <TopNavigationAction
      icon={(iconProps) =>
        savedState ? <Icon {...iconProps} name='bookmark' /> : <Icon {...iconProps} name='bookmark-outline' />
      }
      onPress={() => (savedState ? handleUnsaveRecipe() : handleSaveRecipe())}
    />
  )
}
