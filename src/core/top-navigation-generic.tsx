import React, { FC } from 'react';
import { TopNavigation, TopNavigationAction, TopNavigationProps } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/core';

import * as Icons from './icons/Icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TopNavigationGenericProps extends TopNavigationProps {
  title?: string
}

const TopNavigationGeneric: FC<TopNavigationGenericProps> = ({ style, ...props }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <TopNavigation
      alignment="center"
      accessoryLeft={() => 
        <TopNavigationAction
          icon={Icons.Back}
          onPress={() => navigation.goBack()}
        />
      }
      {...props}
      style={[{ backgroundColor: "transparent", paddingTop: insets.top }, style]}
    />
  )
}

export default TopNavigationGeneric;
