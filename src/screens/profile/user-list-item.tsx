/**
 * Author: Edward Jones
 */
import React from 'react'
import { Avatar, ListItem } from '@ui-kitten/components'
import { Users_users_data } from '@greeneggs/types/graphql'
import { noAvatar } from '@greeneggs/assets'
import { useNavigateToProfile } from '@greeneggs/navigation/utils'
import * as Icons from '@greeneggs/ui/icons'

interface UserListItemProps {
  user: Users_users_data
}

/**
 * List item component used to consistently display GraphQL user data as a list item
 */
export function UserListItem({ user }: UserListItemProps) {
  const navigateToProfile = useNavigateToProfile()
  return (
    <ListItem
      title={`${user.firstName} ${user.lastName}`}
      accessoryLeft={() => (
        <Avatar
          style={{ width: 32, height: 32, marginHorizontal: 8 }}
          source={user.avatarURI ? { uri: user.avatarURI } : noAvatar}
        />
      )}
      accessoryRight={Icons.Forward}
      onPress={() => navigateToProfile(user.id)}
    />
  )
}
