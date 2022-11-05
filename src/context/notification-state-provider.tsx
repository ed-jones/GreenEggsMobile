/**
 * Author: Edward Jones
 */
import { useState, useEffect, PropsWithChildren } from 'react';
import { NotificationCount } from '@greeneggs/types/graphql'
import { useQuery } from '@apollo/client'
import { Queries } from '@greeneggs/graphql'
import { defaultNotificationState, NotificationContext, NotificationState } from './index'

/**
 * Provider that lets all child components access the notification state
 */
export function NotificationStateProvider({ children }: PropsWithChildren<object>) {
  const [notificationState, setNotificationState] = useState<NotificationState>(defaultNotificationState)

  const { data, refetch: refetchNotificationState } = useQuery<NotificationCount>(Queries.getNotificationCount, {
    pollInterval: 10000,
  })

  useEffect(() => {
    setNotificationState({
      unreadCount: data?.notificationCount.data?.notificationCount ?? 0,
    })
  }, [data])

  return (
    <NotificationContext.Provider
      value={{
        notificationState,
        setNotificationState,
        refetchNotificationState,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
