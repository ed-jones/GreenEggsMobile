import React, { FC } from "react";
import { Input as UIKittenInput, InputProps } from "@ui-kitten/components";

/**
 * Simple wrapper for the UI Kitten Input component that styles it with a white background
 */
export const Input: FC<InputProps> = ({ children, style, ...props }) => (
  <UIKittenInput {...props} style={[style, { backgroundColor: "white" }]}>
    {children}
  </UIKittenInput>
);
