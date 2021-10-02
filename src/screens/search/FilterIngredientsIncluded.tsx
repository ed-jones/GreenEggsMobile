import React, { FC } from 'react';
import { Icons, Queries } from '@greeneggs/core';
import { List, ListItem, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ingredients } from '@greeneggs/types/graphql';
import { useQuery } from '@apollo/client';
import LoadingScreen from '../loading/LoadingScreen';
import IngredientListItem from '@greeneggs/core/ingredient-list-item/IngredientListItem';

const FilterIngredientsIncluded: FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { data, loading, error } = useQuery<Ingredients>(Queries.GET_INGREDIENTS);
  const ingredients = data?.ingredients.data;

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <>
      <TopNavigation
        style={{ backgroundColor: "transparent", paddingTop: insets.top }}
        accessoryLeft={() => 
          <TopNavigationAction
            icon={Icons.Back}
            onPress={() => navigation.goBack()}
          />
        }
        title="Filter Search"
        alignment="center"
      />
      <List data={ingredients} renderItem={({ item }) => (
        <IngredientListItem ingredient={item} />
      )} />
    </>
  );
}

export default FilterIngredientsIncluded;
