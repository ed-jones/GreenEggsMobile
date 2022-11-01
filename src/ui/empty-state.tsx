/**
 * Author: Edward Jones
 */
import React from 'react'
import { Icon, Text, TextElement } from '@ui-kitten/components'
import { View } from 'react-native'

interface EmptyStateProps {
  title?: React.ReactText | TextElement
  description?: React.ReactText | TextElement
}

const color = '#6B7280'

/**
 * Component to display during the absence of content. Takes an optional title and description.
 */
export function EmptyState({ title = 'Nothing here!', description }: EmptyStateProps) {
  return (
    <View
      style={{
        flexDirection: 'column',
        paddingHorizontal: 32,
        alignItems: 'center',
      }}
    >
      <Icon fill={color} name='alert-circle-outline' style={{ width: 38, height: 38, marginBottom: 8 }} />
      <View style={{ flexShrink: 1 }}>
        <Text style={{ color, paddingBottom: 8, textAlign: 'center' }} category='h6'>
          {title}
        </Text>
        <Text style={{ color, textAlign: 'center' }} category='p1'>
          {description}
        </Text>
      </View>
    </View>
  )
}
