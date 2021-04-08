import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  Card, List, Text, Layout,
} from '@ui-kitten/components';

interface IRecipe {
  title: string;
  ingredients: string[];
}

const Recipes: IRecipe[] = [
  {
    title: 'Fruit Salad',
    ingredients: ['Kiwi Fruit', 'Orange', 'Peach', 'Strawberry'],
  },
  {
    title: 'Greek Salad',
    ingredients: [
      'Tomato',
      'Cucumber',
      'Onion',
      'Feta',
      'Olives',
      'Oregano',
      'Olive Oil',
    ],
  },
];

const styles = StyleSheet.create({
  button: {
    margin: 2,
  },
  card: {
    margin: 8,
  },
});

const RecipeCard = ({ item }: { item: IRecipe; index: number; }) => (
  <Card style={styles.card}>
    <Text category="h1">{item.title}</Text>
    <List data={item.ingredients} renderItem={(props) => <Text>{props.item}</Text>} />
  </Card>
);

export default function TabOneScreen() {
  return (
    <Layout>
      <List data={Recipes} renderItem={RecipeCard} />
    </Layout>
  );
}
