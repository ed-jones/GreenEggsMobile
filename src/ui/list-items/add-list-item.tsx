/**
 * Author: Edward Jones
 */
import React from 'react'
import { Divider, ListItem, Text, useTheme } from '@ui-kitten/components'
import { FieldError } from 'react-hook-form'
import * as Icons from '../icons'

interface IAddListItem {
  label: string
  onPress: () => void
  error?: FieldError | undefined
}

/**
 * List item for creating a new list item when pressed.
 */
export function AddListItem({ label, onPress, error }: IAddListItem) {
  const theme = useTheme()
  return (
    <>
      <Divider />
      <ListItem
        style={{
          justifyContent: 'center',
          borderColor: theme['text-danger-color'],
          borderTopWidth: error ? 1 : undefined,
          borderBottomWidth: error ? 1 : undefined,
        }}
        onPress={onPress}
      >
        <Icons.Add
          style={{ width: 24, height: 24, marginRight: 8, marginLeft: -32 }}
          fill={error ? theme['text-danger-color'] : theme['text-primary-color']}
        />
        <Text category='label' status={error ? 'danger' : undefined}>
          {label}
        </Text>
      </ListItem>
      {error ? (
        <Text category='c2' status='danger' style={{ marginHorizontal: 16, marginTop: 8 }}>
          {error.message}
        </Text>
      ) : undefined}
    </>
  )
}
