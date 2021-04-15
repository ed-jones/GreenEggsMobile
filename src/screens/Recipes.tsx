import * as React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import {
  Text, TopNavigation,
} from '@ui-kitten/components';
import { useQuery } from '@apollo/client';
import { Recipes_recipes } from '../types/graphql'

import { GET_RECIPES } from '../graphql/queries';
import { RecipeCard } from '../components';
import LoadingScreen from './LoadingScreen';

export default function Recipes() {
  const { loading, error, data, refetch } = useQuery(GET_RECIPES);

  if (loading) return <LoadingScreen />;
  if (error) return <Text>`Error! ${error.message}`</Text>;

  return (
    <>
      <TopNavigation
        title='Recipes'
      />
      <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}>
        {data.recipes.map((recipe: Recipes_recipes) => <RecipeCard key={recipe.id} recipe={recipe}/>)}
      </ScrollView>
    </>
  );
}
