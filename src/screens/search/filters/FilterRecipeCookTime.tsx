import React, { FC } from 'react';
import { Icons } from '@greeneggs/core';
import { TopNavigation, TopNavigationAction, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FilterIngredientsExcluded: FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

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
      <Text>Work in progress!</Text>
    </>
  );
}

export default FilterIngredientsExcluded;
