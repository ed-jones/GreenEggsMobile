/**
 * Author: Edward Jones
 */
import React, { ReactText } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { Icon, IconProps, Text, TextElement, ThemedComponentProps, withStyles } from '@ui-kitten/components'
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
export const Callout = withStyles(({ type, message, eva, style, title }: IAlert & ThemedComponentProps) => {
  const iconNameFromAlertType: Record<AlertType, IconProps> = {
    danger: {
      name: 'alert-triangle',
      fill: eva?.theme?.['color-danger-500'],
    },
    warning: {
      name: 'alert-triangle',
      fill: eva?.theme?.['color-warning-500'],
    },
    info: {
      name: 'info',
      fill: eva?.theme?.['color-info-500'],
    },
    success: {
      name: 'checkmark-circle-2',
      fill: eva?.theme?.['color-success-500'],
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
      <Icon style={{ width: 48, height: 48, marginRight: 10 }} {...iconNameFromAlertType[type]} />
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
})
