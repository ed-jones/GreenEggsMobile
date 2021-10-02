import React, { FC } from 'react';
import { Divider, List, ListItem, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import { Icons } from '@greeneggs/core';

const FilterOptions = [
  'Ingredients (Included)',
  'Ingredients (Excluded)',
  'Category',
  'Allergies',
  'Diets',
  'Cook Time',
]

const RecipeSearchFilter: FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
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
      <List data={FilterOptions} renderItem={({ item }) => (
        <>
          <ListItem title={item} accessoryRight={Icons.Forward} />
          <Divider />
        </>
      )}/>
    </>
  );
}

export default RecipeSearchFilter;
