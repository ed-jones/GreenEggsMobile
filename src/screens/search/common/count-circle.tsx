import { ThemedComponentProps, withStyles } from '@ui-kitten/components';
import React, { FC } from 'react';
import { View } from 'react-native';
import Svg, { Circle, SvgProps, Text } from 'react-native-svg';

export interface CountCircleProps extends Omit<SvgProps, 'children'> {
  children: number
}

export const CountCircle = withStyles(({ children, eva, ...props}: CountCircleProps & ThemedComponentProps) => {
  return (
    <Svg {...props} width="18" height="18">
      <Circle cx="50%" cy="50%" r="50%" fill={eva?.theme?.["color-primary-500"]} />
      <Text fontSize={10} fill="white" x="50%" y="50%" textAnchor="middle" alignmentBaseline="middle">{children}</Text>
    </Svg>
  )
})
