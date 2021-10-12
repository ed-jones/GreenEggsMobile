import React, { FC } from "react";
import {
  Avatar,
  Divider,
  ListItem,
  ListItemProps,
  ThemedComponentProps,
  withStyles,
  Text,
} from "@ui-kitten/components";
import {
  notifications as notificationsType,
  notificationsVariables,
  notifications_notifications_data,
  NotificationType as NotificationTypeEnum,
  RecipeFilter,
  Sort,
} from "@greeneggs/types/graphql";
import { Mutations, Queries } from "@greeneggs/graphql";
import {
  Background,
  Callout,
  Icons,
  LazyList,
  TopNavigation,
} from "@greeneggs/ui";
import { noAvatar } from "@greeneggs/assets";
import { convertTimeEstimate, convertUserToFullname } from "@greeneggs/utils";
import Svg, { Circle } from "react-native-svg";
import { GestureResponderEvent, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useMutation } from "@apollo/client";

type NotificationListItemProps = ListItemProps &
  notifications_notifications_data;

const NotificationListItem = withStyles(
  ({
    eva,
    concerns,
    createdAt,
    read,
    title,
    onPress,
    id,
    ...props
  }: NotificationListItemProps & ThemedComponentProps) => {
    const [markRead] = useMutation(Mutations.READ_NOTIFICATIONS, {
      variables: {
        notificationId: id,
      },
      refetchQueries: [Queries.GET_NOTIFICATIONS, "notifications"],
    });

    function handlePress(event: GestureResponderEvent) {
      markRead();
      onPress?.(event);
    }

    return (
      <ListItem
        {...props}
        onPress={handlePress}
        title={
          <Text category="p1">
            <Text category="p1" style={{ fontWeight: "bold" }}>
              {convertUserToFullname(concerns)}
            </Text>
            {` ${title}`}
          </Text>
        }
        description={`${convertTimeEstimate(createdAt)} ago`}
        accessoryRight={Icons.Forward}
        accessoryLeft={() => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {!read && (
              <Svg height="8" width="8">
                <Circle
                  cx="4"
                  cy="4"
                  r="4"
                  fill={eva?.theme?.["color-primary-500"]}
                />
              </Svg>
            )}
            <Avatar
              source={
                concerns.avatarURI ? { uri: concerns.avatarURI } : noAvatar
              }
              style={{ marginLeft: read ? 16 : 8 }}
            />
          </View>
        )}
      />
    );
  }
);

const CommentLikedNotificationListItem: FC<notifications_notifications_data> = (
  notification: notifications_notifications_data
) => {
  const navigation = useNavigation();
  return (
    <NotificationListItem
      {...notification}
      title="liked your comment."
      onPress={() =>
        navigation.navigate("Comment", { commentId: notification.linkId })
      }
    />
  );
};

const RecipeLikedNotificationListItem: FC<notifications_notifications_data> = (
  notification: notifications_notifications_data
) => {
  const navigation = useNavigation();
  return (
    <NotificationListItem
      {...notification}
      title="liked your recipe."
      onPress={() =>
        navigation.navigate("Recipe", { recipeId: notification.linkId })
      }
    />
  );
};

const RecipeCommentedNotificationListItem: FC<notifications_notifications_data> =
  (notification: notifications_notifications_data) => {
    const navigation = useNavigation();
    return (
      <NotificationListItem
        {...notification}
        title="commented on your recipe."
        onPress={() =>
          navigation.navigate("Comment", { commentId: notification.linkId })
        }
      />
    );
  };

const CommentRepliedNotificationListItem: FC<notifications_notifications_data> =
  (notification: notifications_notifications_data) => {
    const navigation = useNavigation();
    return (
      <NotificationListItem
        {...notification}
        title="replied to your comment."
        onPress={() =>
          navigation.navigate("Comment", { commentId: notification.linkId })
        }
      />
    );
  };

const NOTIFICATION_LIST_ITEM_MAP: Record<
  NotificationTypeEnum,
  FC<notifications_notifications_data>
> = {
  COMMENT_LIKED: CommentLikedNotificationListItem,
  RECIPE_LIKED: RecipeLikedNotificationListItem,
  RECIPE_COMMENTED: RecipeCommentedNotificationListItem,
  COMMENT_REPLIED: CommentRepliedNotificationListItem,
};

export const Notifications: FC = () => {
  return (
    <Background>
      <TopNavigation title="Notifications" accessoryLeft={undefined} />
      <LazyList<
        notificationsType,
        notificationsVariables,
        notifications_notifications_data,
        Sort,
        RecipeFilter
      >
        query={Queries.GET_NOTIFICATIONS}
        variables={{}}
        dataKey="notifications"
        emptyMessage="You don't have any notifications."
        errorMessage="You don't have any notifications."
        renderItem={({ item: notification, index }) => {
          const NotificationListItem =
            NOTIFICATION_LIST_ITEM_MAP[notification.type];
          return (
            <View key={index.toString()}>
              <NotificationListItem {...notification} />
              <Divider />
            </View>
          );
        }}
      />
    </Background>
  );
};
