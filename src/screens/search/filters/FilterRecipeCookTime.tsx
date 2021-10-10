import React, { FC } from 'react';
import { Icons } from '@greeneggs/core';
import { TopNavigation, TopNavigationAction, Text, Layout } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FilterIngredientsExcluded: FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <Layout style={{ flex: 1 }} level="2">
      <TopNavigation
        style={{ backgroundColor: "transparent", paddingTop: insets.top }}
        accessoryLeft={() => 
          <TopNavigationAction
            icon={Icons.Back}
            onPress={() => navigation.goBack()}
          />
        }
        title="Cook Time"
        alignment="center"
      />
      <Text>Work in progress!</Text>
    </Layout>
  );
}

export default FilterIngredientsExcluded;
