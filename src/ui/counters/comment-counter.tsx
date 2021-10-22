/**
 * Author: Edward Jones
 */
import React, { FC } from 'react';
import { recipes_recipes_data_comments } from '@greeneggs/types/graphql';
import { useNavigation } from '@react-navigation/core';
import { LabelledIcon } from '../labelled-icon';

interface CommentCounterProps {
  commentCount: number;
  comments: recipes_recipes_data_comments[];
}

/**
 * Displays the number of comments on a post, and links to the list of comments
 */
export const CommentCounter: FC<CommentCounterProps> = ({ commentCount, comments }) => {
  const navigation = useNavigation();

  return (
    <LabelledIcon
      label={String(commentCount)}
      iconName="message-square-outline"
      onPress={() => navigation.navigate("RecipeAllComments", {
        comments,
        commentCount,
      })}
    />
  );
}