/**
 * Author: Edward Jones
 */
import React, { FC, useContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Mutations } from "@greeneggs/graphql";
import { LikeRecipe, UnlikeRecipe } from "@greeneggs/types/graphql";
import { UserContext } from "@greeneggs/providers";
import { LikeCounter } from "./like-counter";

interface RecipeLikeCounterProps {
  likeCount: number;
  recipeId: string;
  liked: boolean;
  submittedById: string;
  disabled?: boolean;
}

/**
 * Displays number of likes and allows for liking of a recipe.
 */
export const RecipeLikeCounter: FC<RecipeLikeCounterProps> = ({
  likeCount,
  recipeId,
  liked,
  submittedById,
  disabled,
}) => {
  // Use local state for instant feedback on slow networks
  const { me } = useContext(UserContext);

  const [likeRecipe] = useMutation<LikeRecipe>(Mutations.LIKE_RECIPE, {
    variables: {
      recipeId,
    },
  });

  const [unlikeRecipe] = useMutation<UnlikeRecipe>(Mutations.UNLIKE_RECIPE, {
    variables: {
      recipeId,
    },
  });

  return (
    <LikeCounter
      onLike={likeRecipe}
      onUnlike={unlikeRecipe}
      disabled={disabled ?? submittedById === me?.id}
      liked={liked}
      likeCount={likeCount}
    />
  );
};
