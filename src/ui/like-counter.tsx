import React, { FC, useState } from "react";
import { useMutation } from "@apollo/client";
import { Mutations } from "@greeneggs/graphql";
import { LikeRecipe, UnlikeRecipe } from "@greeneggs/types/graphql";
import { LabelledIcon } from "./labelled-icon";

interface LikeCounterProps {
  likeCount: number;
  recipeId: string;
  liked: boolean;
}

export const LikeCounter: FC<LikeCounterProps> = ({
  likeCount,
  recipeId,
  liked,
}) => {
  // Use local state for instant feedback on slow networks
  const [likedState, setLikedState] = useState(liked);
  const [likeCountState, setLikeCountState] = useState(likeCount);

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

  function handleLikeRecipe() {
    setLikedState(true);
    setLikeCountState(likeCountState + 1);
    likeRecipe().catch(() => {
      // Undo local state change if mutation fails
      setLikedState(false);
      setLikeCountState(likeCountState - 1);
    });
  }

  function handleUnlikeRecipe() {
    setLikedState(false);
    setLikeCountState(likeCountState - 1);
    unlikeRecipe().catch(() => {
      // Undo local state change if mutation fails
      setLikedState(true);
      setLikeCountState(likeCountState + 1);
    });
  }

  return (
    <LabelledIcon
      label={String(likeCountState)}
      iconName={likedState ? "heart" : "heart-outline"}
      fill={likedState ? "red" : "black"}
      onPress={likedState ? handleUnlikeRecipe : handleLikeRecipe}
    />
  );
};
