import React, { useState, FC, createContext, useEffect } from 'react';
import { NotificationCount } from '@greeneggs/types/graphql';
import { ApolloQueryResult, OperationVariables, useQuery } from '@apollo/client';
import { Queries } from '@greeneggs/graphql';

export interface NotificationState {
  unreadCount: number
}

export const defaultNotificationState: NotificationState = {
  unreadCount: 0
}

export interface NotificationContextInterface {
  notificationState: NotificationState,
  setNotificationState?: (notificationState: NotificationState) => void,
  refetchNotificationState?: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<NotificationCount>>
}

export const NotificationContext = createContext<NotificationContextInterface>({
  notificationState: defaultNotificationState,
  setNotificationState: undefined,
  refetchNotificationState: undefined,
});

export const NotificationStateProvider: FC = ({ children }) => {
  const [notificationState, setNotificationState] = useState<NotificationState>(defaultNotificationState);

  const { data, refetch: refetchNotificationState } = useQuery<NotificationCount>(
    Queries.GET_NOTIFICATION_COUNT, {
      pollInterval: 10000,
    }
  );
  
  useEffect(() => {
    setNotificationState({ unreadCount: data?.notificationCount.data?.notificationCount ?? 0 })
  }, [data])

  return (
    <NotificationContext.Provider value={{notificationState, setNotificationState, refetchNotificationState}}>
      {children}
    </NotificationContext.Provider>
  );
};
