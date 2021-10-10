import React from 'react';
import { Avatar, ListItem } from '@ui-kitten/components';
import { Users_users_data } from '@greeneggs/types/graphql';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

import * as Icons from './icons/Icons';
import noavatar from './no-avatar/noavatar.jpg';

interface UserListItemProps {
  user: Users_users_data
}

const UserListItem = ({ user }: UserListItemProps) => {
  const navigation: StackNavigationProp<any, any> = useNavigation();
  return (
    <ListItem
      title={`${user.firstName} ${user.lastName}`}
      accessoryLeft={() => (
        <Avatar
          style={{ width: 32, height: 32, marginHorizontal: 8 }}
          source={user.avatarURI ? { uri: user.avatarURI } : noavatar}
        />
      )}
      accessoryRight={Icons.Forward}
      onPress={() => navigation.push("Profile", { userId: user.id })}
    />
  )
}

export default UserListItem;
