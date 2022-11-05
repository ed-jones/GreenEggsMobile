/**
 * Author: Edward Jones
 */
import { Input as UIKittenInput, InputProps } from '@ui-kitten/components';

/**
 * Simple wrapper for the UI Kitten Input component that styles it with a white background
 */
export function Input({ children, style, ...props }: InputProps) {
  return (
    <UIKittenInput {...props} style={[style, { backgroundColor: 'white' }]}>
      {children}
    </UIKittenInput>
  )
}
