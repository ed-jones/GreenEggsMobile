/**
 * Author: Wambugu Mutahi
 */
import React, { Key, useContext } from 'react'
import { Text, ListItem, Icon, Divider, useTheme } from '@ui-kitten/components'
import { Alert, ScrollView, StyleSheet } from 'react-native'
import { Icons } from '@greeneggs/ui'
import Svg, { Circle } from 'react-native-svg'
import * as SecureStore from 'expo-secure-store'
import { AuthContext } from '@greeneggs/providers/auth-provider'
import { TopNavigation, Background } from '@greeneggs/ui'
import { useNavigation } from '@react-navigation/native'
import { LoggedInNavigationProp } from '@greeneggs/navigation/routes/logged-in-routes'

const styles = StyleSheet.create({
  header: { padding: 16 },
})

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
const SettingsListItem = ({ onPress, title, rightText, color, icon, key }: ListItemProps) => (
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

/**
 * Screen that displays a complete list of settings and about details.
 */
export const Settings = () => {
  const navigation = useNavigation<LoggedInNavigationProp>()
  const { setToken } = useContext(AuthContext)
  const theme = useTheme()

  const Colors = {
    blue: theme['color-info-500'],
    yellow: theme['color-warning-500'],
    green: theme['color-primary-400'],
    red: theme['color-danger-500'],
  }

  const AccountSettings: ListItemProps[] = [
    {
      title: 'Edit Profile',
      icon: 'edit-outline',
      color: Colors.blue,
      onPress: () => navigation.navigate('EditProfile'),
      key: 'editProfile',
    },
    {
      title: 'Edit Profile Picture',
      icon: 'camera-outline',
      color: Colors.blue,
      onPress: () => navigation.navigate('EditProfilePicture'),
      key: 'editProfilePicture',
    },
    {
      title: 'Change Password',
      icon: 'lock-outline',
      color: Colors.yellow,
      onPress: () => navigation.navigate('ChangePassword'),
      key: 'changePassword',
    },
    {
      title: 'Sign Out',
      icon: 'log-out-outline',
      color: Colors.yellow,
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
                SecureStore.deleteItemAsync('token').then(() => {
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
      color: Colors.red,
      onPress: () => navigation.navigate('DeleteAccount'),
      key: 'deleteAccount',
    },
  ]

  const DietaryPreferences: ListItemProps[] = [
    {
      title: 'Diets',
      icon: 'heart-outline',
      color: Colors.green,
      onPress: () => navigation.navigate('Diets'),
      key: 'diets',
    },
    {
      title: 'Allergies',
      icon: 'slash-outline',
      color: Colors.green,
      onPress: () => navigation.navigate('Allergies'),
      key: 'allergies',
    },
  ]

  const About: ListItemProps[] = [
    {
      title: 'Version',
      icon: 'cube-outline',
      color: Colors.yellow,
      rightText: process.env.version || 'alpha-0.01',
      key: 'version',
    },
    {
      title: 'Developer',
      icon: 'code-outline',
      color: Colors.green,
      rightText: 'Green Eggs',
      key: 'developer',
    },
  ]

  return (
    <Background>
      <TopNavigation />
      <ScrollView>
        <Text category='h6' style={styles.header}>
          Account
        </Text>
        {AccountSettings.map(SettingsListItem)}
        <Text category='h6' style={styles.header}>
          Dietary Preferences
        </Text>
        {DietaryPreferences.map(SettingsListItem)}
        {/* <Text category="h6" style={styles.header}>
            Privacy
          </Text>
          {PrivacySettings.map(SettingsListItem)} */}
        <Text category='h6' style={styles.header}>
          About
        </Text>
        {About.map(SettingsListItem)}
      </ScrollView>
    </Background>
  )
}
