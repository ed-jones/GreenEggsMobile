import React, { FC, useState } from 'react';
import { Icons, Queries } from '@greeneggs/core';
import { List, ListItem, TopNavigation, TopNavigationAction, Text, Divider, Input } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ingredients } from '@greeneggs/types/graphql';
import { useQuery } from '@apollo/client';

import LoadingScreen from '../../loading/LoadingScreen';
import AlphaList, { AlphabetType, buildAlphaListItems } from '@greeneggs/core/alpha-list';

const FilterIngredientsIncluded: FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const { data, loading, error } = useQuery<Ingredients>(Queries.GET_INGREDIENTS, {
    variables: {
      query: '',
      offset: 0,
      limit: 100,
    }
  });
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
    items: ingredients.filter((ingredient) => ingredient.name.toLowerCase().includes(query.toLowerCase())),
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
      <Input
        style={{ padding: 16 }}
        placeholder="Search Ingredients"
        accessoryLeft={Icons.Search}
        onChangeText={setQuery}
        value={query}
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
