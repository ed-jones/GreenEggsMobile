/**
 * Author: Edward Jones
 */
import React, { ReactElement } from 'react'
import { ListItem, ListItemProps, Text } from '@ui-kitten/components'
import { Icons } from '@greeneggs/ui'

/**
 * Simple list item component that contains the text READ MORE and down icon
 */
export const ViewMore = (props: ListItemProps): ReactElement => (
  <ListItem
    accessoryRight={Icons.Down}
    title={() => (
      <Text style={{ textAlign: 'center', marginRight: -32 }} category='label'>
        VIEW MORE
      </Text>
    )}
    {...props}
  />
)
