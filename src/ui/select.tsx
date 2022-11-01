/**
 * Author: Edward Jones
 */
import React from 'react'
import { Select as UIKittenSelect, SelectProps } from '@ui-kitten/components'

/**
 * Wrapper for the UI Kitten Select component that provides styles specific for Green Eggs
 */
export function Select({ children, style, ...props }: SelectProps) {
  return (
    <UIKittenSelect style={[style]} {...props}>
      {children}
    </UIKittenSelect>
  )
}
