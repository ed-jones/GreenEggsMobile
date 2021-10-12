import React, { FC } from "react";
import {
  Avatar,
  Divider,
  ListItem,
  ListItemProps,
} from "@ui-kitten/components";
import { useQuery } from "@apollo/client";
import {
  Notifications as NotificationsType,
  Notifications_notifications_data,
  NotificationType as NotificationTypeEnum,
} from "@greeneggs/types/graphql";
import { Queries } from "@greeneggs/graphql";
import { Background, Callout, TopNavigation } from "@greeneggs/ui";
import { noAvatar } from "@greeneggs/assets";
import { convertTimeEstimate, convertUserToFullname } from "@greeneggs/utils";

type NotificationListItemProps = ListItemProps & Notifications_notifications_data;

const NotificationListItem: FC<NotificationListItemProps> = ({
  concerns,
  createdAt,
  ...props
}) => {
  return (
    <ListItem
      {...props}
      description={`${convertTimeEstimate(createdAt)} ago`}
      accessoryLeft={() => (
        <Avatar source={concerns.avatarURI ? { uri: concerns.avatarURI } : noAvatar} />
      )}
    />
  );
};

const CommentLikedNotificationListItem: FC<Notifications_notifications_data> = (
  notification: Notifications_notifications_data
) => {
  return (
    <NotificationListItem
      {...notification}
      title={`${convertUserToFullname(notification.concerns)} liked your comment.`}
    />
  );
};

const RecipeLikedNotificationListItem: FC<Notifications_notifications_data> = (
  notification: Notifications_notifications_data
) => {
  return (
    <NotificationListItem
      {...notification}
      title={`${convertUserToFullname(notification.concerns)} liked your recipe.`}
    />
  );
};

const RecipeCommentedNotificationListItem: FC<Notifications_notifications_data> =
  (notification: Notifications_notifications_data) => {
    return (
      <NotificationListItem
        {...notification}
        title={`${convertUserToFullname(notification.concerns)} commented on your recipe.`}
      />
    );
  };

const CommentRepliedNotificationListItem: FC<Notifications_notifications_data> =
  (notification: Notifications_notifications_data) => {
    return (
      <NotificationListItem
        {...notification}
        title={`${convertUserToFullname(notification.concerns)} replied to your comment.`}
      />
    );
  };

const NOTIFICATION_LIST_ITEM_MAP: Record<
  NotificationTypeEnum,
  FC<Notifications_notifications_data>
> = {
  COMMENT_LIKED: CommentLikedNotificationListItem,
  RECIPE_LIKED: RecipeLikedNotificationListItem,
  RECIPE_COMMENTED: RecipeCommentedNotificationListItem,
  COMMENT_REPLIED: CommentRepliedNotificationListItem,
};

export const Notifications: FC = () => {
  const { data, loading, error } = useQuery<NotificationsType>(
    Queries.GET_NOTIFICATIONS
  );
  const notifications = data?.notifications.data;

  if (loading || error) {
    return <Callout message="Data not defined" type="info" />;
  }

  return (
    <Background>
      <TopNavigation title="Notifications" accessoryLeft={undefined} />
      {notifications?.map((notification) => {
        const NotificationListItem =
          NOTIFICATION_LIST_ITEM_MAP[notification.type];
        return (
          <>
            <NotificationListItem {...notification} />
            <Divider />
          </>
        );
      })}
    </Background>
  );
};
