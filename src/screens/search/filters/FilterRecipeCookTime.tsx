import React, { FC } from 'react';
import { Text, Layout } from '@ui-kitten/components';
import TopNavigationGeneric from '@greeneggs/core/top-navigation-generic';

const FilterIngredientsExcluded: FC = () => (
  <Layout style={{ flex: 1 }} level="2">
    <TopNavigationGeneric title="Cook Time" />
    <Text>Work in progress!</Text>
  </Layout>
);

export default FilterIngredientsExcluded;
