/**
 * Author: Edward Jones
 */
import React, { FC } from 'react';
import { TopNavigation as UIKittenTopNavigation, TopNavigationAction, TopNavigationProps } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import * as Icons from './icons';

export const TopNavigation: FC<TopNavigationProps> = ({ style, ...props }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <UIKittenTopNavigation
      alignment="center"
      accessoryLeft={() => 
        <TopNavigationAction
          icon={Icons.Back}
          onPress={() => navigation.goBack()}
        />
      }
      {...props}
      style={[{ backgroundColor: "transparent", marginTop: insets.top }, style]}
    />
  )
}
