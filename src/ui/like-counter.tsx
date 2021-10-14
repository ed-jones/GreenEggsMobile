import React, { FC, useContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Mutations } from "@greeneggs/graphql";
import { LikeRecipe, UnlikeRecipe } from "@greeneggs/types/graphql";
import { LabelledIcon, LabelledIconProps } from "./labelled-icon";
import { UserContext } from "@greeneggs/providers";

interface LikeCounterProps {
  likeCount: number;
  recipeId: string;
  liked: boolean;
  submittedById: string;
}

enum LikeCounterStates {
  LIKED,
  NOT_LIKED,
  DISABLED,
}

export const LikeCounter: FC<LikeCounterProps> = ({
  likeCount,
  recipeId,
  liked,
  submittedById,
}) => {
  // Use local state for instant feedback on slow networks
  const [likeCounterState, setLikeCounterState] = useState(
    liked ? LikeCounterStates.LIKED : LikeCounterStates.NOT_LIKED
  );
  const [likeCountState, setLikeCountState] = useState(likeCount);
  const { me } = useContext(UserContext);

  useEffect(() => {
    if (submittedById === me?.id) {
      setLikeCounterState(LikeCounterStates.DISABLED);
    }
  }, [me]);

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
    setLikeCounterState(LikeCounterStates.LIKED);
    setLikeCountState(likeCountState + 1);
    likeRecipe().catch(() => {
      // Undo local state change if mutation fails
      setLikeCounterState(LikeCounterStates.NOT_LIKED);
      setLikeCountState(likeCountState - 1);
    });
  }

  function handleUnlikeRecipe() {
    setLikeCounterState(LikeCounterStates.NOT_LIKED);
    setLikeCountState(likeCountState - 1);
    unlikeRecipe().catch(() => {
      // Undo local state change if mutation fails
      setLikeCounterState(LikeCounterStates.LIKED);
      setLikeCountState(likeCountState + 1);
    });
  }

  const LIKE_COUNTER_STATE_PROP_MAP: Record<
    LikeCounterStates,
    Pick<LabelledIconProps, "iconName" | "fill" | "onPress">
  > = {
    [LikeCounterStates.LIKED]: {
      iconName: "heart",
      fill: "red",
      onPress: handleUnlikeRecipe,
    },
    [LikeCounterStates.NOT_LIKED]: {
      iconName: "heart-outline",
      fill: "black",
      onPress: handleLikeRecipe,
    },
    [LikeCounterStates.DISABLED]: {
      iconName: "heart-outline",
      fill: "black",
    },
  };

  return (
    <LabelledIcon
      label={String(likeCountState)}
      {...LIKE_COUNTER_STATE_PROP_MAP[likeCounterState]}
    />
  );
};
