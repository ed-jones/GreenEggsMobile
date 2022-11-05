/**
 * Author: Andrew Wilkie
 */
import React, { ReactElement, useState } from 'react'
import {
  FollowedUsers,
  FollowedUsersVariables,
  FollowedUsers_followedUsers_data,
  RecipeFilter,
  Sort,
} from '@greeneggs/types/graphql'
import { Queries } from '@greeneggs/graphql'
import { RouteProp, useRoute } from '@react-navigation/core'
import { LoggedInRouteParams } from '@greeneggs/navigation/types'
import { Background } from '@greeneggs/ui/background'
import { TopNavigation } from '@greeneggs/ui/top-navigation'
import { Input } from '@greeneggs/ui/input'
import { LazyList } from '@greeneggs/ui/lazy-list'
import { UserListItem } from './user-list-item'
import * as Icons from '@greeneggs/ui/icons'

/**
 * Screen that shows a list of followers for a user.
 */
export function Followers(): ReactElement {
  const [query, setQuery] = useState('')
  const {
    params: { userId },
  } = useRoute<RouteProp<LoggedInRouteParams, 'Followers'>>()

  return (
    <Background style={{ height: '100%' }}>
      <TopNavigation title='Followers' />
      <Input
        placeholder='Search users'
        size='medium'
        style={{ margin: 16 }}
        accessoryLeft={Icons.Search}
        value={query}
        onChangeText={(newText) => setQuery(newText)}
      />
      <LazyList<FollowedUsers, FollowedUsersVariables, FollowedUsers_followedUsers_data, Sort, RecipeFilter>
        limit={15}
        query={Queries.getFollowedUsers}
        variables={{
          userId,
          query,
        }}
        dataKey='followedUsers'
        emptyMessage="This user isn't being followed by anyone."
        renderItem={({ item: user }) => <UserListItem user={user} />}
      />
    </Background>
  )
}
