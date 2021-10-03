import React, { FC } from 'react';
import { Icons, Queries } from '@greeneggs/core';
import { List, ListItem, TopNavigation, TopNavigationAction, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Categories } from '@greeneggs/types/graphql';
import { useQuery } from '@apollo/client';
import LoadingScreen from '../../loading/LoadingScreen';

const FilterRecipeCategories: FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { data, loading, error } = useQuery<Categories>(Queries.GET_CATEGORIES);
  const categories = data?.categories.data;

  if (loading) {
    return <LoadingScreen />
  }

  if (error) {
    return <Text>Error! {error.message}</Text>
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
        title="Ingredients (Excluded)"
        alignment="center"
      />
      <List data={categories} renderItem={({ item }) => (
        <ListItem title={item.name} />
      )} />
    </>
  );
}

export default FilterRecipeCategories;
