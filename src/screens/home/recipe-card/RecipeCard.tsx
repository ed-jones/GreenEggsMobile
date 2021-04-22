import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Card } from '@ui-kitten/components';

import { Recipes_recipes } from '../../../types/graphql'
import { imagenotfound } from '../../../core';
import RecipeCardHeader from './RecipeCardHeader';
import RecipeCardFooter from './RecipeCardFooter';

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
  },
  imageContainer: {
    marginHorizontal: -24,
    marginVertical: -16,
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1/1,
    resizeMode: "cover",
  }
});

const RecipeCard = ({ recipe }: { recipe: Recipes_recipes }) => (
  <Card
    appearance='filled'
    style={styles.card}
    header={() => (
      <RecipeCardHeader {...recipe.submittedBy}/>
    )}
    footer={() => (
      <RecipeCardFooter {...recipe} />
    )}
  >
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={recipe.previewURI ? {uri: recipe.previewURI} : imagenotfound}
      />
    </View>
  </Card>
);

export default RecipeCard;
