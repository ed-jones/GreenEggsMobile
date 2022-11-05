/**
 * Author: Edward Jones
 */
import { useContext } from 'react'
import { useNavigation } from '@react-navigation/core'
import { LoggedInNavigationProp } from '@greeneggs/navigation/types'
import { UserContext } from '@greeneggs/context'

type NavigateToProfile = (userId: string) => void

/**
 * Function that provides better logic when navigating to a user profile.
 * If the selected user profile is the logged in user, redirect to the profile screen.
 */
export function useNavigateToProfile(): NavigateToProfile {
  const { me } = useContext(UserContext)
  const navigation = useNavigation<LoggedInNavigationProp>()

  function navigateToMyProfile() {
    navigation.reset({
      routes: [{ name: 'Navigation' }],
    })
    navigation.navigate('MyProfile', { index: 4 })
  }

  return (userId) =>
    me?.id === userId
      ? navigateToMyProfile()
      : navigation.navigate('Profile', {
          userId,
        })
}
