import * as React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { Text } from '@ui-kitten/components';
import { useQuery } from '@apollo/client';

import { Recipes_recipes } from '../../types/graphql';
import { Queries } from '../../core';
import LoadingScreen from '../loading/LoadingScreen';
import RecipeCard from './recipe-card/RecipeCard';

export default function Recipes() {
  const { loading, error, data, refetch } = useQuery(Queries.GET_RECIPES);

  if (loading) return <LoadingScreen />;
  if (error) return <Text>`Error! ${error.message}`</Text>;

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}>
      {data.recipes.map((recipe: Recipes_recipes) => <RecipeCard key={recipe.id} recipe={recipe}/>)}
    </ScrollView>
  );
}
