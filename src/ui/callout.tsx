/**
 * Author: Edward Jones
 */
import React, { ReactText } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { Icon, Text, TextElement, useTheme } from '@ui-kitten/components'
import { alpha } from '@greeneggs/utils'

type AlertType = 'danger' | 'warning' | 'info' | 'success'

interface IAlert {
  type: AlertType
  title?: ReactText | TextElement
  message: ReactText | TextElement
  style?: StyleProp<ViewStyle>
}

/**
 * Displays an important message that should stand out from the rest of the view.
 */
export function Callout({ type, message, style, title }: IAlert) {
  const theme = useTheme()
  const iconNameFromAlertType: Record<AlertType, { name: string; fill: string }> = {
    danger: {
      name: 'alert-triangle',
      fill: theme['color-danger-500'],
    },
    warning: {
      name: 'alert-triangle',
      fill: theme['color-warning-500'],
    },
    info: {
      name: 'info',
      fill: theme['color-info-500'],
    },
    success: {
      name: 'checkmark-circle-2',
      fill: theme['color-success-500'],
    },
  }

  return (
    <View
      style={Object.assign(
        {
          flexDirection: 'row',
          alignItems: 'flex-start',
          padding: 16,
          backgroundColor: alpha(iconNameFromAlertType[type].fill, 0.2),
          borderRadius: 8,
        },
        style
      )}
    >
      <Icon style={{ width: 48, height: 48, marginRight: 16 }} {...iconNameFromAlertType[type]} />
      <View style={{ justifyContent: 'center', minHeight: 48, flexShrink: 1 }}>
        {title && (
          <Text status={type} style={{ fontWeight: 'bold' }}>
            {title}
          </Text>
        )}
        <Text status={type}>{message}</Text>
      </View>
    </View>
  )
}
