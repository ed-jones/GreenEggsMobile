/**
 * Author: Andrew Wilkie
 */
import React, { ReactElement, useState } from 'react'
import { StyleSheet } from 'react-native'
import {
  FollowingUsers,
  FollowingUsersVariables,
  FollowingUsers_followingUsers_data,
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

const styles = StyleSheet.create({
  found: {
    padding: 16,
  },
  search: {
    margin: 16,
  },
  view: {
    height: '100%',
  },
})

/**
 * Screen that shows a list of users a user is following.
 */
export function Following(): ReactElement {
  const [query, setQuery] = useState('')
  const {
    params: { userId },
  } = useRoute<RouteProp<LoggedInRouteParams, 'Following'>>()

  return (
    <Background style={{ ...styles.view }}>
      <TopNavigation title='Following' />
      <Input
        placeholder='Search users'
        size='medium'
        style={styles.search}
        accessoryLeft={Icons.Search}
        value={query}
        onChangeText={(newText) => setQuery(newText)}
      />
      <LazyList<FollowingUsers, FollowingUsersVariables, FollowingUsers_followingUsers_data, Sort, RecipeFilter>
        limit={15}
        query={Queries.getFollowingUsers}
        variables={{
          userId,
          query,
        }}
        dataKey='followingUsers'
        emptyMessage="This user hasn't followed anyone."
        renderItem={({ item: user }) => <UserListItem user={user} />}
      />
    </Background>
  )
}
