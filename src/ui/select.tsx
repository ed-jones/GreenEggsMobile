/**
 * Author: Edward Jones
 */
import React, { FC } from 'react';
import { Select as UIKittenSelect, SelectProps } from "@ui-kitten/components";

/**
 * Wrapper for the UI Kitten Select component that provides styles specific for Green Eggs
 */
export const Select: FC<SelectProps> = ({ children, style, ...props }) => (
  <UIKittenSelect style={[style]} {...props}>
    {children}
  </UIKittenSelect>
);
