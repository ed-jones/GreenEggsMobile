/**
 * Author: Andrew Wilkie
 */
import React from 'react'
import { Text } from '@ui-kitten/components'
import { useQuery } from '@apollo/client'
import { Callout } from '@greeneggs/ui'
import { Queries } from '@greeneggs/graphql'
import { Me } from '@greeneggs/types/graphql'
import { LoadingScreen } from '../loading-screen'
import { GenericProfile } from './generic-profile'

/**
 * Screen for displaying the profile details for the logged in user.
 * Lets the user access the settings page, a full list of their upload recipes,
 * and lets the user edit their profile.
 */
export const MyProfile = () => {
  const meResult = useQuery<Me>(Queries.ME)

  if (meResult.loading) {
    return <LoadingScreen />
  }

  if (meResult.error) {
    return <Callout message='There was an error' type='danger' />
  }

  const me = meResult.data?.me.data

  if (me === undefined || me === null) {
    return <Text>Error! User not found</Text>
  }

  return <GenericProfile userId={me.id} isMe />
}
