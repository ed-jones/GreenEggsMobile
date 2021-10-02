import React, { FC, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { Queries } from '@greeneggs/core';
import { Me } from '@greeneggs/types/graphql';

import Stack from '../Stack';
import LoggedInRoutes from './LoggedInRoutes';
import LoggedOutRoutes from './LoggedOutRoutes';


const Router: FC = () => {
  const { data } = useQuery<Me>(Queries.ME);
  const me = data?.me.data;

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {Boolean(me) ? LoggedInRoutes: LoggedOutRoutes}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router;