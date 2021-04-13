import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  Card, List, Text, Layout, TopNavigation,
} from '@ui-kitten/components';
import { gql, useQuery } from '@apollo/client';

import { GET_RECIPES } from '../graphql/queries';

const styles = StyleSheet.create({
  button: {
    margin: 2,
  },
  card: {
    margin: 8,
  },
});

const RecipeCard = ({ item }: { item: any; index: number; }) => (
  <Card style={styles.card}>
    <Text category="h1">{item.title}</Text>
    <Text>{item.description}</Text>
  </Card>
);

export default function Recipes() {
  const { loading, error, data } = useQuery(GET_RECIPES);

  if (loading) return <Text>'Loading...'</Text>;
  if (error) return <Text>`Error! ${error.message}`</Text>;

  return (
    <>
      <TopNavigation
        title='Recipes'
      />
      <Layout>
        <List data={data.allRecipes} renderItem={RecipeCard} />
      </Layout>
    </>
  );
}
