import React, { FC } from 'react';
import { Select as UIKittenSelect, SelectProps } from "@ui-kitten/components";

const Select: FC<SelectProps> = ({ children, style, ...props }) => (
  <UIKittenSelect style={[style, { backgroundColor: 'white' }]} {...props}>
    {children}
  </UIKittenSelect>
);

export default Select;
