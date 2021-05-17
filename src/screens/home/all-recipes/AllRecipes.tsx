import * as React from 'react';
import {
  RefreshControl, ScrollView, StyleSheet, View,
} from 'react-native';
import { Text } from '@ui-kitten/components';
import { useQuery } from '@apollo/client';
import { Recipes_recipes } from '@greeneggs/types/graphql';
import { Queries } from '@greeneggs/core';

import LoadingScreen from '../../loading/LoadingScreen';
import RecipeCard from '../recipe-card/RecipeCard';

const CardVerticalMargin = 20;
const CardHorizontalMargin = 24;

const styles = StyleSheet.create({
  firstCard: {
    marginTop: CardVerticalMargin,
  },
  card: {
    marginBottom: CardVerticalMargin,
    marginHorizontal: CardHorizontalMargin,
  },
});

export default function Recipes() {
  const {
    loading, error, data, refetch,
  } = useQuery(Queries.GET_RECIPES);

  if (loading) return <LoadingScreen />;
  if (error) {
    return (
      <Text>
        Error! {error.message}
      </Text>
    );
  }

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}>
      {data.recipes.map((recipe: Recipes_recipes, i: number) => (
        <View
          key={recipe.id}
          style={i === 0 ? { ...styles.firstCard, ...styles.card } : styles.card}
        >
          <RecipeCard recipe={recipe} />
        </View>
      ))}
    </ScrollView>
  );
}
