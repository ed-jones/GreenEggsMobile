/**
 * Author: Andrew Wilkie
 */
import { RouteProp, useRoute } from '@react-navigation/native'
import React, { ReactElement } from 'react'
import { GenericProfile } from './generic-profile'

type ProfileRoute = RouteProp<{ params: { userId: string } }, 'params'>

/**
 * Screen for displaying the profile details for a user (not the currently logged in user).
 */
export const Profile = (): ReactElement => {
  const route = useRoute<ProfileRoute>()
  const { userId } = route.params

  return <GenericProfile userId={userId} />
}
