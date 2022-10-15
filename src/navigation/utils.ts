/**
 * Author: Edward Jones
 */
import { useContext } from 'react'
import { UserContext } from '@greeneggs/providers'
import { useNavigation } from '@react-navigation/core'

type NavigateToProfile = (userId: string) => void

/**
 * Function that provides better logic when navigating to a user profile.
 * If the selected user profile is the logged in user, redirect to the profile screen.
 */
export function useNavigateToProfile(): NavigateToProfile {
  const { me } = useContext(UserContext)
  const navigation = useNavigation()

  function navigateToMyProfile() {
    navigation.reset({
      routes: [{ name: 'Home' }],
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
