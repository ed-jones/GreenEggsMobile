/**
 * Author: Edward Jones
 */
import React, { ReactElement, ReactNode } from 'react'
import { Button, List, Text, TextElement } from '@ui-kitten/components'
import { ListRenderItem, View } from 'react-native'
import { Icons, Background } from '@greeneggs/ui'
import { EmptyState } from '@greeneggs/ui/empty-state'
import { AddRecipeStyles } from './add-recipe-styles'

interface AddRecipePartTemplateProps<T> {
  title: React.ReactText | TextElement
  createButtonTitle: React.ReactText | TextElement
  onPressCreate: () => void
  emptyStateTitle: React.ReactText | TextElement
  emptyStateDescription: React.ReactText | TextElement
  header?: ReactNode
  listItem: ListRenderItem<T> | null | undefined
  data: readonly T[] | null | undefined
}
/**
 * Template for screens that create larger sections of the recipe, i.e. all ingredients.
 */
export function AddRecipePartTemplate<T>({
  title,
  createButtonTitle,
  onPressCreate,
  emptyStateTitle,
  emptyStateDescription,
  header,
  listItem,
  data,
}: AddRecipePartTemplateProps<T>): ReactElement {
  return (
    <Background>
      <List
        ListHeaderComponent={
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                ...AddRecipeStyles.heading,
                ...AddRecipeStyles.view,
              }}
            >
              <Text category='h5'>{title}</Text>
              <View style={{ flexDirection: 'column' }}>
                <Button
                  size='small'
                  status='basic'
                  accessoryLeft={Icons.Add}
                  style={{ flexShrink: 1 }}
                  onPress={onPressCreate}
                >
                  {createButtonTitle}
                </Button>
              </View>
            </View>
            {header}
          </>
        }
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={
          <View style={{ flexGrow: 1, justifyContent: 'center' }}>
            <EmptyState title={emptyStateTitle} description={emptyStateDescription} />
          </View>
        }
        data={data}
        renderItem={listItem}
      />
    </Background>
  )
}
