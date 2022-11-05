/**
 * Author: Edward Jones
 */
import React from 'react'
import { Text, Icon } from '@ui-kitten/components'
import { View, Pressable } from 'react-native'

export interface LabelledIconProps {
  iconName: string
  label: string
  onPress?: () => void
  fill?: string
}

/**
 * Component that renders an icon with a label
 */
export function LabelledIcon({ iconName, label, onPress, fill }: LabelledIconProps) {
  return (
    <Pressable onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}>
        <Icon style={{ width: 24, height: 24, marginRight: 8 }} name={iconName} fill={fill || 'black'} />
        <Text style={{ fontWeight: 'bold' }}>{label}</Text>
      </View>
    </Pressable>
  )
}
