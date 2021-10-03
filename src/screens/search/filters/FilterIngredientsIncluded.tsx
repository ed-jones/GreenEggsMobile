import React, { FC } from 'react';
import { Icons, Queries } from '@greeneggs/core';
import { List, ListItem, TopNavigation, TopNavigationAction, Text, Divider } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ingredients } from '@greeneggs/types/graphql';
import { useQuery } from '@apollo/client';

import LoadingScreen from '../../loading/LoadingScreen';
import AlphaList, { AlphabetType, buildAlphaListItems } from '@greeneggs/core/alpha-list';

const FilterIngredientsIncluded: FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { data, loading, error } = useQuery<Ingredients>(Queries.GET_INGREDIENTS);
  const ingredients = data?.ingredients.data;

  if (loading) {
    return <LoadingScreen />
  }

  if (error) {
    return <Text>Error! {error.message}</Text>
  }

  if (ingredients === undefined) {
    return <Text>No Ingredients Found</Text>
  }

  const alphaListItems = buildAlphaListItems({
    items: ingredients,
    categoriseItem: (item) => item.name[0].toLowerCase() as AlphabetType
  });

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
        title="Ingredients (Included)"
        alignment="center"
      />
      <AlphaList items={alphaListItems} renderItem={(item) => (
        <>
          <ListItem title={item.name} />
          <Divider />
        </>
      )}/>
    </>
  );
}

export default FilterIngredientsIncluded;
