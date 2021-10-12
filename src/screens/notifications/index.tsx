import React, { FC } from 'react';
import { Avatar, ListItem, ListItemProps } from '@ui-kitten/components';
import { useQuery } from '@apollo/client';
import { Notifications as NotificationsType } from '@greeneggs/types/graphql';
import { Queries } from '@greeneggs/graphql';
import { Background, Callout } from '@greeneggs/ui';
import { noAvatar } from '@greeneggs/assets';

interface NotificationListItemProps extends ListItemProps {
  read: boolean;
  avatarURI: string | null;
  message: string;
}

const NotificationListItem: FC<NotificationListItemProps> = ({ read, avatarURI, message, ...props }) => {
  return (
    <ListItem accessoryLeft={() => <Avatar source={avatarURI ? { uri: avatarURI } : noAvatar} />} />
  )
}

export const Notifications: FC = () => {
  const { data, loading, error } = useQuery<NotificationsType>(Queries.GET_NOTIFICATIONS);
  const notifications = data?.notifications.data;

  if (loading || error) {
    return (
      <Callout message="Data not defined" type="info" />
    )
  }

  return (
    <Background>
      {notifications?.map((notification) => <NotificationListItem read={notification.read} avatarURI={notification.concerns.avatarURI} message="Test" />)}
    </Background>
  );
}