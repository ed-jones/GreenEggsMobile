import React, { FC } from 'react';
import { Divider, List, ListItem, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import { Icons } from '@greeneggs/core';

interface FilterListItemProps {
  title: string;
  to: string;
}

const FilterOptions: FilterListItemProps[] = [
  { title: 'Ingredients (Included)', to: 'FilterIngredientsIncluded' },
  { title: 'Ingredients (Excluded)', to: '' },
  { title: 'Category', to: '' },
  { title: 'Allergies', to: '' },
  { title: 'Diets', to: '' },
  { title: 'Cook Time', to: '' },
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
          <ListItem title={item.title} accessoryRight={Icons.Forward} onPress={() => navigation.navigate(item.to)} />
          <Divider />
        </>
      )}/>
    </>
  );
}

export default RecipeSearchFilter;
