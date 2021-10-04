import React, { FC } from 'react';
import { Divider, List, ListItem, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import { Icons } from '@greeneggs/core';
import FilterControlGroup from '@greeneggs/core/filter-control-group';

interface FilterListItemProps {
  title: string;
  to: string;
}

const FilterOptions: FilterListItemProps[] = [
  { title: 'Ingredients (Included)', to: 'FilterIngredientsIncluded' },
  { title: 'Ingredients (Excluded)', to: 'FilterIngredientsExcluded' },
  { title: 'Categories', to: 'FilterRecipeCategories' },
  { title: 'Allergies', to: 'FilterRecipeAllergies' },
  { title: 'Diets', to: 'FilterRecipeDiets' },
  { title: 'Cook Time', to: 'FilterRecipeCookTime' },
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
      <FilterControlGroup
        label="N CATEGORIES SELECTED"
        clearButton={{ title: "CLEAR SELECTED", onPress: () => undefined }}
        applyButton={{ title: "ADD TO FILTER", onPress: () => undefined }}
      />
    </>
  );
}

export default RecipeSearchFilter;
