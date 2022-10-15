/**
 * Author: Edward Jones
 */
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, ThemedComponentProps, withStyles } from '@ui-kitten/components'

const styles = StyleSheet.create({
  tag: {
    borderRadius: 16,
    marginRight: 6,
    marginVertical: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  tags: {
    flexDirection: 'row',
  },
})

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
export const Tags = withStyles(({ tags, eva }: IRecipeCategoryTags & ThemedComponentProps) => (
  <View style={styles.tags}>
    {tags.map((tag: Tag) => (
      <Text
        category='label'
        appearance='alternative'
        style={{
          ...styles.tag,
          backgroundColor: eva?.theme && eva.theme['color-basic-600'],
        }}
        onPress={tag.onPress}
      >
        {tag.name}
      </Text>
    ))}
  </View>
))
