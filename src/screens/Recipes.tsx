import * as React from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import {
  Card, List, Text, Layout, TopNavigation, Spinner,
} from '@ui-kitten/components';
import { gql, NetworkStatus, useQuery } from '@apollo/client';
import { GetRecipes_allRecipes } from '../types/graphql'

import { GET_RECIPES } from '../graphql/queries';

const styles = StyleSheet.create({
  button: {
    margin: 2,
  },
  card: {
    margin: 8,
  },
});

const RecipeCard = ({ recipe }: { recipe: GetRecipes_allRecipes }) => (
  <Card style={styles.card}>
    <Text category="h1">{recipe.title}</Text>
    <Text>{recipe.description}</Text>
  </Card>
);

export default function Recipes() {
  const { loading, error, data, refetch, networkStatus } = useQuery(GET_RECIPES);

  if (loading) return <Spinner />;
  if (error) return <Text>`Error! ${error.message}`</Text>;

  return (
    <>
      <TopNavigation
        title='Recipes'
      />
      <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}>
        {data.allRecipes.map((recipe: GetRecipes_allRecipes) => <RecipeCard key={recipe.title} recipe={recipe}/>)}
      </ScrollView>
    </>
  );
}
