/**
 * Author: Edward Jones
 */
import React from 'react'
import { View } from 'react-native'
import { Text, useTheme } from '@ui-kitten/components'

export interface Tag {
  name: string
  onPress: () => void
}

interface IRecipeCategoryTags {
  tags: Tag[]
}

/**
 * Displays a horizontally scrolling list of tags
 */
export function Tags({ tags }: IRecipeCategoryTags) {
  const theme = useTheme()
  return (
    <View style={{ flexDirection: 'row' }}>
      {tags.map((tag: Tag) => (
        <Text
          key={tag.name}
          category='label'
          appearance='alternative'
          style={{
            borderRadius: 10,
            marginRight: 6,
            marginVertical: 4,
            paddingVertical: 4,
            paddingHorizontal: 8,
            overflow: 'hidden',
            backgroundColor: theme['color-basic-600'],
          }}
          onPress={tag.onPress}
        >
          {tag.name}
        </Text>
      ))}
    </View>
  )
}
