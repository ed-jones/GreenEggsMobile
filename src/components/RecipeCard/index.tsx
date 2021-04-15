import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Card } from '@ui-kitten/components';

import { GetRecipes_allRecipes } from '../../types/graphql'
import RecipeCardHeader from './RecipeCardHeader';
import RecipeCardFooter from './RecipeCardFooter';

const styles = StyleSheet.create({
  card: {
    margin: 12,
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

const RecipeCard = ({ recipe }: { recipe: GetRecipes_allRecipes }) => (
  <Card
    appearance='filled'
    style={styles.card}
    header={RecipeCardHeader}
    footer={RecipeCardFooter}
  >
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={{uri: 'https://www.tasteofhome.com/wp-content/uploads/2018/01/Fluffy-Scrambled-Eggs_exps12235_SD143206C04_08_3bC_RMS.jpg'}}
      />
    </View>
  </Card>
);

export default RecipeCard;