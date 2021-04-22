import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';
import { LabelledIcon } from '@greeneggs/core';
import { Recipes_recipes } from '@greeneggs/types/graphql';

const styles = StyleSheet.create({
  view: {
    padding: 14,
  },
  recipeTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  recipeDescription: {
    marginBottom: 16,
    marginTop: 8,
  },
  labelledIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export interface IRecipeCardFooterProps extends Partial<Recipes_recipes> {
  title: string;
  description: string;
  commentCount: number;
  likeCount: number;
  createdAt: string;
  servingCount: number;
  timeEstimate: string;
}

function convertTimeEstimate(timeEstimate: string): string {
  const minuteEstimate = new Date(Number(timeEstimate)).getMinutes();
  if (minuteEstimate < 60) {
    return `${minuteEstimate} mins`;
  } if (minuteEstimate === 60) {
    return '1 hour';
  }
  return `${Math.floor(minuteEstimate / 60)} hours`;
}

const RecipeCardFooter = (
  {
    title, description, commentCount, likeCount, servingCount, timeEstimate,
  }: IRecipeCardFooterProps,
) => (
  <View style={styles.view}>
    <Text category="h1" style={styles.recipeTitle}>{title}</Text>
    <Text category="s1" style={styles.recipeDescription}>{description}</Text>
    <View style={styles.labelledIcons}>
      <LabelledIcon label={convertTimeEstimate(timeEstimate)} iconName="clock-outline" />
      <LabelledIcon label={String(servingCount)} iconName="person-outline" />
      <LabelledIcon label={String(likeCount)} iconName="heart-outline" />
      <LabelledIcon label={String(commentCount)} iconName="message-square-outline" />
    </View>
  </View>
);

export default RecipeCardFooter;
