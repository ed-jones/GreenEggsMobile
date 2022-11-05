/**
 * Author: Xiaoyao Zhang
 */
import { FC, useContext } from 'react';
import { Avatar, Divider, ListItem, ListItemProps, ThemedComponentProps, Text } from '@ui-kitten/components'
import {
  notifications as notificationsType,
  notificationsVariables,
  notifications_notifications_data,
  NotificationType as NotificationTypeEnum,
  RecipeFilter,
  Sort,
} from '@greeneggs/types/graphql'
import { Mutations, Queries } from '@greeneggs/graphql'
import { noAvatar } from '@greeneggs/assets'
import { convertSubmittedAt, convertUserToFullName } from '@greeneggs/utils'
import Svg, { Circle } from 'react-native-svg'
import { GestureResponderEvent, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { useMutation } from '@apollo/client'
import { LoggedInNavigationProp } from '@greeneggs/navigation/types'
import { NotificationContext } from '@greeneggs/context'
import { Background } from '@greeneggs/ui/background'
import { TopNavigation } from '@greeneggs/ui/top-navigation'
import { LazyList } from '@greeneggs/ui/lazy-list'
import * as Icons from '@greeneggs/ui/icons'

type NotificationListItemProps = ListItemProps & notifications_notifications_data

/**
 * Screen for displaying a list of all notifications a user has received.
 */
function NotificationListItem({
  eva,
  concerns,
  createdAt,
  read,
  title,
  onPress,
  id,
  ...props
}: NotificationListItemProps & ThemedComponentProps) {
  const { refetchNotificationState } = useContext(NotificationContext)
  const [markRead] = useMutation(Mutations.readNotifications, {
    variables: {
      notificationId: id,
    },
    refetchQueries: [Queries.getNotifications, 'notifications'],
  })

  function handlePress(event: GestureResponderEvent) {
    void markRead()
    onPress?.(event)
    void refetchNotificationState?.()
  }

  return (
    <ListItem
      {...props}
      onPress={handlePress}
      title={
        <Text category='p1'>
          <>
            <Text category='p1' style={{ fontWeight: 'bold' }}>
              {convertUserToFullName(concerns)}
            </Text>
            {typeof title === 'number' || typeof title === 'string' ? ` ${title}` : title}
          </>
        </Text>
      }
      description={`${convertSubmittedAt(createdAt)} ago`}
      accessoryRight={Icons.Forward}
      accessoryLeft={() => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {!read && (
            <Svg height='8' width='8'>
              <Circle cx='4' cy='4' r='4' fill={eva?.theme?.['color-primary-500']} />
            </Svg>
          )}
          <Avatar
            source={concerns.avatarURI ? { uri: concerns.avatarURI } : noAvatar}
            style={{ marginLeft: read ? 16 : 8 }}
          />
        </View>
      )}
    />
  )
}

function CommentLikedNotificationListItem(notification: notifications_notifications_data) {
  const navigation = useNavigation<LoggedInNavigationProp>()
  return (
    <NotificationListItem
      {...notification}
      title='liked your comment.'
      onPress={() => navigation.navigate('Comment', { commentId: notification.linkId })}
    />
  )
}

function RecipeLikedNotificationListItem(notification: notifications_notifications_data) {
  const navigation = useNavigation<LoggedInNavigationProp>()
  return (
    <NotificationListItem
      {...notification}
      title='liked your recipe.'
      onPress={() => navigation.navigate('Recipe', { recipeId: notification.linkId })}
    />
  )
}

function RecipeCommentedNotificationListItem(notification: notifications_notifications_data) {
  const navigation = useNavigation<LoggedInNavigationProp>()
  return (
    <NotificationListItem
      {...notification}
      title='commented on your recipe.'
      onPress={() =>
        navigation.navigate('RecipeCommentReplies', {
          commentId: notification.linkId,
          replying: false,
        })
      }
    />
  )
}

function CommentRepliedNotificationListItem(notification: notifications_notifications_data) {
  const navigation = useNavigation<LoggedInNavigationProp>()
  if (!notification.linkId) throw new Error('Notification link ID not found')

  return (
    <NotificationListItem
      {...notification}
      title='replied to your comment.'
      onPress={() =>
        navigation.navigate('RecipeCommentReplies', {
          commentId: notification.linkId,
          replying: false,
        })
      }
    />
  )
}

const notificationListItemMap: Record<NotificationTypeEnum, FC<notifications_notifications_data>> = {
  COMMENT_LIKED: CommentLikedNotificationListItem,
  RECIPE_LIKED: RecipeLikedNotificationListItem,
  RECIPE_COMMENTED: RecipeCommentedNotificationListItem,
  COMMENT_REPLIED: CommentRepliedNotificationListItem,
}

export function Notifications() {
  return (
    <Background>
      <TopNavigation title='Notifications' accessoryLeft={undefined} />
      <LazyList<notificationsType, notificationsVariables, notifications_notifications_data, Sort, RecipeFilter>
        query={Queries.getNotifications}
        limit={15}
        variables={{}}
        dataKey='notifications'
        emptyMessage="You don't have any notifications."
        renderItem={({ item: notification, index }) => {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const NotificationListItem = notificationListItemMap[notification.type]
          return (
            <View key={index.toString()}>
              <NotificationListItem {...notification} />
              <Divider />
            </View>
          )
        }}
      />
    </Background>
  )
}
