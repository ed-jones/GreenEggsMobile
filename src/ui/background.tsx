/**
 * Author: Edward Jones
 */
import React, { FC } from 'react';
import { Layout, LayoutProps } from '@ui-kitten/components';

export const Background: FC<LayoutProps> = ({ children, style, ...props }) => {
  return (
    <Layout style={[{flex: 1}, style]} level="2" {...props} >
      {children}
    </Layout>
  )
}
