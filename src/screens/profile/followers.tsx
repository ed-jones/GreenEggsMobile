/**
 * Author: Andrew Wilkie
 */
import React, { ReactElement, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Background, Icons, LazyList, TopNavigation, UserListItem, Input } from '@greeneggs/ui'
import {
  FollowedUsers,
  FollowedUsersVariables,
  FollowedUsers_followedUsers_data,
  RecipeFilter,
  Sort,
} from '@greeneggs/types/graphql'
import { Queries } from '@greeneggs/graphql'
import { RouteProp, useRoute } from '@react-navigation/core'
import { LoggedInRouteParams } from '@greeneggs/navigation/routes/logged-in-routes'

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
 * Screen that shows a list of followers for a user.
 */
export function Followers(): ReactElement {
  const [query, setQuery] = useState('')
  const {
    params: { userId },
  } = useRoute<RouteProp<LoggedInRouteParams, 'Followers'>>()

  return (
    <Background style={{ ...styles.view }}>
      <TopNavigation title='Followers' />
      <Input
        placeholder='Search users'
        size='medium'
        style={styles.search}
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
