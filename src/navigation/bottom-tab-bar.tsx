/**
 * Author: Edward Jones
 */
import React, { ReactElement, useContext } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  BottomNavigationTabProps,
  Divider,
  useTheme,
} from '@ui-kitten/components'
import Svg, { Circle } from 'react-native-svg'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { HideOnKeyboard } from '@greeneggs/ui/hide-on-keyboard'
import { NotificationContext, AddRecipeContext } from '@greeneggs/context'

const styles = StyleSheet.create({
  primary: {
    height: 48,
    width: 48,
    marginLeft: 8,
    marginTop: 8,
  },
  secondary: {
    height: 32,
    width: 32,
  },
})

enum IconStyle {
  Primary = 'primary',
  Secondary = 'secondary',
}

interface IBottonNavigationIcon {
  name: string
  iconStyle: IconStyle
  selected: boolean
}

/**
 * Component for the bottom tab bar. Includes home, saved recipes, create recipe, notifications and profile.
 */
function BottomNavigationIcon({ name, iconStyle, selected, ...rest }: IBottonNavigationIcon) {
  const theme = useTheme()
  const iconName = `${name}${!selected ? '-outline' : ''}`
  if (iconStyle === IconStyle.Primary) {
    return (
      <View style={{ marginTop: -16 }}>
        <Svg
          height='72'
          width='72'
          style={{
            position: 'absolute',
            marginLeft: -4,
            marginTop: -4,
          }}
        >
          <Circle cx='36' cy='36' r='36' fill={selected ? theme['color-primary-500'] : theme['color-success-500']} />
        </Svg>
        <Icon {...rest} name={iconName} style={styles.primary} fill={selected ? 'white' : theme['color-primary-500']} />
      </View>
    )
  } else {
    return <Icon {...rest} style={styles[iconStyle]} name={iconName} fill={theme['text-primary-color']} />
  }
}

interface NotificationIconProps extends BottomNavigationTabProps {
  selected: boolean
}

function NotificationIcon({ selected, eva, ...props }: NotificationIconProps) {
  const theme = useTheme()
  const {
    notificationState: { unreadCount },
  } = useContext(NotificationContext)

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      {unreadCount > 0 && (
        <Svg
          height='8'
          width='8'
          style={{
            position: 'absolute',
            zIndex: 1,
            marginTop: -4,
          }}
        >
          <Circle cx='4' cy='4' r='4' fill={theme['color-primary-500']} />
        </Svg>
      )}
      <BottomNavigationIcon {...props} name='bell' iconStyle={IconStyle.Secondary} selected={selected} />
    </View>
  )
}

export function BottomTabBar({ navigation, state }: BottomTabBarProps): ReactElement {
  const insets = useSafeAreaInsets()
  const navigationState = navigation.getState()
  const {
    form,
    steps,
    categoriesFieldArray,
    ingredientsFieldArray,
    stepsFieldArray,
    allergiesFieldArray,
    dietsFieldArray,
  } = useContext(AddRecipeContext)

  function isFormDirty() {
    return (
      form?.formState.isDirty ||
      categoriesFieldArray?.fields.length ||
      ingredientsFieldArray?.fields.length ||
      stepsFieldArray?.fields.length ||
      allergiesFieldArray?.fields.length ||
      dietsFieldArray?.fields.length
    )
  }

  function resetForm() {
    form?.reset()
    steps?.reset()
  }

  const interceptNavigate = (index: number, navigate: () => void) => {
    if (index === navigationState.index) {
      return
    }
    if (navigationState.index === 2 && isFormDirty()) {
      Alert.alert(
        'Exit without saving?',
        'If you exit now you will lose your changes',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              resetForm()
              navigate()
            },
          },
        ],
        { cancelable: false }
      )
    } else {
      steps?.reset()
      navigate()
    }
  }

  return (
    <HideOnKeyboard>
      <Divider />
      <BottomNavigation
        selectedIndex={state.index}
        onSelect={(index) => {
          interceptNavigate(index, () => {
            navigation.navigate(state.routeNames[index])
          })
        }}
        appearance='noIndicator'
        style={{ paddingTop: 12, paddingBottom: 24 + insets.bottom }}
      >
        <BottomNavigationTab
          icon={(props) => (
            <BottomNavigationIcon
              {...props}
              name='home'
              iconStyle={IconStyle.Secondary}
              selected={navigationState.index == 0}
            />
          )}
        />
        <BottomNavigationTab
          icon={(props) => (
            <BottomNavigationIcon
              {...props}
              name='bookmark'
              iconStyle={IconStyle.Secondary}
              selected={navigationState.index == 1}
            />
          )}
        />
        <BottomNavigationTab
          icon={(props) => (
            <BottomNavigationIcon
              {...props}
              name='plus'
              iconStyle={IconStyle.Primary}
              selected={navigationState.index == 2}
            />
          )}
        />
        <BottomNavigationTab icon={(props) => <NotificationIcon {...props} selected={navigationState.index == 3} />} />
        <BottomNavigationTab
          icon={(props) => (
            <BottomNavigationIcon
              {...props}
              name='person'
              iconStyle={IconStyle.Secondary}
              selected={navigationState.index == 4}
            />
          )}
        />
      </BottomNavigation>
    </HideOnKeyboard>
  )
}
