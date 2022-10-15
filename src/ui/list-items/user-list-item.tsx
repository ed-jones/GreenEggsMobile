/**
 * Author: Edward Jones
 */
import React, { ReactElement } from 'react'
import { Avatar, ListItem } from '@ui-kitten/components'
import { Users_users_data } from '@greeneggs/types/graphql'
import { Icons } from '@greeneggs/ui'
import { noAvatar } from '@greeneggs/assets'
import { useNavigateToProfile } from '@greeneggs/navigation'

interface UserListItemProps {
  user: Users_users_data
}

/**
 * List item component used to consistently display GraphQL user data as a list item
 */
export const UserListItem = ({ user }: UserListItemProps): ReactElement => {
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
