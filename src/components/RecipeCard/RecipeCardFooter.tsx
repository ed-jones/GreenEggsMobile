import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

import LabelledIcon from '../LabelledIcon';

const styles = StyleSheet.create({
  view: {
    padding: 14,
  },
  recipeTitle: {
    fontWeight: 'bold',
    fontSize: 18
  },
  recipeDescription: {
    marginBottom: 16,
    marginTop: 8,
  },
  labelledIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

const RecipeCardFooter = () => (
  <View style={styles.view}>
    <Text category='h1' style={styles.recipeTitle}>Betty's Scrambled Eggs</Text>
    <Text category='s1' style={styles.recipeDescription}>You can scramble my eggs, Betty</Text>
    <View style={styles.labelledIcons}>
      <LabelledIcon label="20 mins" iconName="clock-outline"/>
      <LabelledIcon label="2" iconName="person-outline"/>
      <LabelledIcon label="54" iconName="heart-outline"/>
      <LabelledIcon label="3" iconName="message-square-outline"/>
    </View>
  </View>
);

export default RecipeCardFooter;
