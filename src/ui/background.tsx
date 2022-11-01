/**
 * Author: Edward Jones
 */
import React from 'react'
import { Layout, LayoutProps } from '@ui-kitten/components'

/**
 * Component to be used as a base for all views.
 * Provides views with the correct background colour and flex properties.
 */
export function Background({ children, style, ...props }: LayoutProps) {
  return (
    <Layout style={[{ flex: 1 }, style]} level='2' {...props}>
      {children}
    </Layout>
  )
}
