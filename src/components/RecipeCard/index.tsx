import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Card, Text } from '@ui-kitten/components';

import { GetRecipes_allRecipes } from '../../types/graphql'
import RecipeCardHeader from './RecipeCardHeader';
import RecipeCardFooter from './RecipeCardFooter';

const styles = StyleSheet.create({
  card: {
    margin: 8,
    borderRadius: 12,
  },
});

const RecipeCard = ({ recipe }: { recipe: GetRecipes_allRecipes }) => (
  <Card
    style={styles.card}
    header={RecipeCardHeader}
    footer={RecipeCardFooter}
  >
    <Text category="h1">{recipe.title}</Text>
    <Text>{recipe.description}</Text>
  </Card>
);

export default RecipeCard;