/**
 * Author: Wambugu Mutahi
 */
import { Key, useContext } from 'react'
import { Text, ListItem, Icon, Divider, useTheme } from '@ui-kitten/components'
import { Alert, ScrollView } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import * as SecureStore from 'expo-secure-store'
import { AuthContext } from '@greeneggs/context'
import { useNavigation } from '@react-navigation/native'
import { LoggedInNavigationProp } from '@greeneggs/navigation/types'
import { Background } from '@greeneggs/ui/background'
import { TopNavigation } from '@greeneggs/ui/top-navigation'
import * as Icons from '@greeneggs/ui/icons'
import { version } from '../../../package.json'

interface ListItemProps {
  title: string
  icon: string
  rightText?: string
  color?: string
  onPress?: () => void
  key: Key
}

/**
 * List item that links to a setting page.
 */
function SettingsListItem({ onPress, title, rightText, color, icon, key }: ListItemProps) {
  return (
    <>
      <ListItem
        key={key}
        onPress={onPress}
        title={title}
        accessoryRight={(props) => (
          <>
            {rightText && <Text category='c2'>{rightText}</Text>}
            {onPress ? <Icons.Forward {...props} /> : null}
          </>
        )}
        accessoryLeft={(props) => (
          <>
            <Svg height='32' width='32' style={{ position: 'absolute', marginLeft: 12 }}>
              <Circle cx='16' cy='16' r='16' fill={color} />
            </Svg>
            <Icon {...props} name={icon} fill='white' />
          </>
        )}
      />

      <Divider />
    </>
  )
}

/**
 * Screen that displays a complete list of settings and about details.
 */
export function Settings() {
  const navigation = useNavigation<LoggedInNavigationProp>()
  const { setToken } = useContext(AuthContext)
  const theme = useTheme()

  const colors = {
    blue: theme['color-info-500'],
    yellow: theme['color-warning-500'],
    green: theme['color-primary-400'],
    red: theme['color-danger-500'],
  }

  const accountSettings: ListItemProps[] = [
    {
      title: 'Edit Profile',
      icon: 'edit-outline',
      color: colors.blue,
      onPress: () => navigation.navigate('EditProfile'),
      key: 'editProfile',
    },
    {
      title: 'Edit Profile Picture',
      icon: 'camera-outline',
      color: colors.blue,
      onPress: () => navigation.navigate('EditProfilePicture'),
      key: 'editProfilePicture',
    },
    {
      title: 'Change Password',
      icon: 'lock-outline',
      color: colors.yellow,
      onPress: () => navigation.navigate('ChangePassword'),
      key: 'changePassword',
    },
    {
      title: 'Sign Out',
      icon: 'log-out-outline',
      color: colors.yellow,
      onPress: () => {
        Alert.alert(
          'Sign out',
          'Are you sure you want to sign out?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Sign Out',
              onPress: () => {
                void SecureStore.deleteItemAsync('token').then(() => {
                  setToken && setToken(null)
                })
              },
            },
          ],
          { cancelable: false }
        )
      },
      key: 'signOut',
    },
    {
      title: 'Delete Account',
      icon: 'trash-2-outline',
      color: colors.red,
      onPress: () => navigation.navigate('DeleteAccount'),
      key: 'deleteAccount',
    },
  ]

  const dietaryPreferences: ListItemProps[] = [
    {
      title: 'Diets',
      icon: 'heart-outline',
      color: colors.green,
      onPress: () => navigation.navigate('Diets'),
      key: 'diets',
    },
    {
      title: 'Allergies',
      icon: 'slash-outline',
      color: colors.green,
      onPress: () => navigation.navigate('Allergies'),
      key: 'allergies',
    },
  ]

  const about: ListItemProps[] = [
    {
      title: 'Version',
      icon: 'cube-outline',
      color: colors.yellow,
      rightText: version,
      key: 'version',
    },
    {
      title: 'Developer',
      icon: 'code-outline',
      color: colors.green,
      rightText: 'Green Eggs',
      key: 'developer',
    },
  ]

  return (
    <Background>
      <TopNavigation />
      <ScrollView>
        <Text category='h6' style={{ padding: 16 }}>
          Account
        </Text>
        {accountSettings.map(SettingsListItem)}
        <Text category='h6' style={{ padding: 16 }}>
          Dietary Preferences
        </Text>
        {dietaryPreferences.map(SettingsListItem)}
        <Text category='h6' style={{ padding: 16 }}>
          About
        </Text>
        {about.map(SettingsListItem)}
      </ScrollView>
    </Background>
  )
}
