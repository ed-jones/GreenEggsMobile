import React, { FC } from 'react';
import { Select as UIKittenSelect, SelectProps } from "@ui-kitten/components";

export const Select: FC<SelectProps> = ({ children, style, ...props }) => (
  <UIKittenSelect style={[style]} {...props}>
    {children}
  </UIKittenSelect>
);
