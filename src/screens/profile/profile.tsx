/**
 * Author: Andrew Wilkie
 */
import React from 'react'
import { GenericProfile } from './generic-profile'

/**
 * Screen for displaying the profile details for a user (not the currently logged in user).
 */
export const Profile = ({ route }: any) => {
  const { userId } = route.params

  return <GenericProfile userId={userId} />
}
