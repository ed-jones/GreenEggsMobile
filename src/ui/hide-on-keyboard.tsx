/**
 * Author: Edward Jones
 * Based on code from the react-navigation bottom tabs library
 */
import React, { FC, useEffect, useState } from 'react'
import { Animated, Platform } from 'react-native'
import useIsKeyboardShown from '@react-navigation/bottom-tabs/src/utils/useIsKeyboardShown'

const useNativeDriver = Platform.OS !== 'web'

/**
 * Component that forces children to be hidden when the device keyboard is visible.
 * Children will be animated to slide down in order to prevent flashing.
 */
export const HideOnKeyboard: FC = ({ children }) => {
  const isKeyboardShown = useIsKeyboardShown()

  const shouldShowTabBar = !isKeyboardShown

  const [isTabBarHidden, setIsTabBarHidden] = useState(!shouldShowTabBar)

  const [visible] = React.useState(() => new Animated.Value(shouldShowTabBar ? 1 : 0))

  useEffect(() => {
    if (shouldShowTabBar) {
      const animation = Animated.timing

      animation(visible, {
        toValue: 1,
        useNativeDriver,
        duration: 250,
      }).start(({ finished }) => {
        if (finished) {
          setIsTabBarHidden(false)
        }
      })
    } else {
      setIsTabBarHidden(true)

      const animation = Animated.timing

      animation(visible, {
        toValue: 0,
        useNativeDriver,
        duration: 200,
      }).start()
    }
  }, [visible, shouldShowTabBar])

  return (
    <Animated.View
      style={{
        left: 0,
        right: 0,
        bottom: 0,
        elevation: 8,
        transform: [
          {
            translateY: visible.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 0],
            }),
          },
        ],
        // Absolutely position the tab bar so that the content is below it
        // This is needed to avoid gap at bottom when the tab bar is hidden
        position: isTabBarHidden ? 'absolute' : (null as any),
      }}
    >
      {children}
    </Animated.View>
  )
}
