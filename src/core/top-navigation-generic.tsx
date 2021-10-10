import React, { FC } from 'react';
import { TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/core';

import * as Icons from './icons/Icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TopNavigationGenericProps {
  title: string
}

const TopNavigationGeneric: FC<TopNavigationGenericProps> = ({ title }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <TopNavigation
      style={{ backgroundColor: "transparent", paddingTop: insets.top }}
      accessoryLeft={() => 
        <TopNavigationAction
          icon={Icons.Back}
          onPress={() => navigation.goBack()}
        />
      }
      title={title}
      alignment="center"
    />
  )
}

export default TopNavigationGeneric;
