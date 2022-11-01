/**
 * Author: Edward Jones
 */
import React, { ReactElement } from 'react'
import { Controller, ControllerProps, FieldValues, RegisterOptions } from 'react-hook-form'
import { InputProps } from '@ui-kitten/components'
import { ErrorFragment } from '@greeneggs/types/graphql'
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'
import { Input } from '@greeneggs/ui'

import { ImageUpload, PrivacySelect, TimeInput } from './inputs'
import { numberToString, stringToNumber } from './inputs/utils'

// Data types that can be used by this component
// Includes form validation, styling and other behaviour
export enum InputType {
  TEXT = 'Text',
  EMAIL = 'Email',
  PASSWORD = 'Password',
  FIRSTNAME = 'FirstName',
  LASTNAME = 'LastName',
  NUMERIC = 'Numeric',
  TEXTAREA = 'TextArea',
  PHOTO = 'Photo',
  PRIVACY = 'Privacy',
  TIME = 'Time',
}

export interface IControlledInput<TFieldValues extends FieldValues> {
  controllerProps: Omit<ControllerProps<TFieldValues>, 'render'>
  inputProps?: InputProps
  submitError?: ErrorFragment | null
  type: InputType
}

// This object exists in order to reuse common form validation rules
export const rules: Record<string, Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>> = {
  REQUIRED: { required: { value: true, message: 'This field is required' } },
  UNDER100CHARS: {
    maxLength: { value: 100, message: 'Must be under 100 characters' },
  },
}

// This is the interface for the object for default props for each input type
// Name and render fields are omitted as they are always already defined
interface IInputTypeDefaultProps<TFieldValues extends FieldValues> {
  controllerProps?: Omit<ControllerProps<TFieldValues>, 'name' | 'render'>
  inputProps?: InputProps
}

// This object stores the default props associated with each input type
// These values can be overwritten
// Example props include form validation rules for emails and passwords
function InputTypeDefaultProps<TFieldValues extends FieldValues>(): Record<
  InputType,
  IInputTypeDefaultProps<TFieldValues>
> {
  return {
    Email: {
      inputProps: {
        label: 'EMAIL',
        textContentType: 'emailAddress',
        autoComplete: 'email',
        autoCapitalize: 'none',
        keyboardType: 'email-address',
        placeholder: 'johnsmith@example.com',
      },
      controllerProps: {
        rules: {
          ...rules.REQUIRED,
          ...rules.UNDER100CHARS,
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Not an email address',
          },
        },
      },
    },
    Text: {},
    TextArea: {},
    Photo: {},
    Password: {
      inputProps: {
        label: 'PASSWORD',
        textContentType: 'password',
        autoComplete: 'password',
        secureTextEntry: true,
        placeholder: '**********',
      },
      controllerProps: {
        rules: {
          ...rules.REQUIRED,
          ...rules.UNDER100CHARS,
          pattern: {
            value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
            message:
              'Password must contain at least 8 characters, upper and lowercase letters, a number and a special character.',
          },
          minLength: { value: 4, message: 'Must be over 4 characters' },
        },
      },
    },
    FirstName: {
      controllerProps: {
        rules: {
          ...rules.REQUIRED,
          ...rules.UNDER100CHARS,
        },
      },
      inputProps: {
        textContentType: 'givenName',
        autoComplete: 'name',
        autoCapitalize: 'words',
        placeholder: 'John',
      },
    },
    LastName: {
      controllerProps: {
        rules: {
          ...rules.REQUIRED,
          ...rules.UNDER100CHARS,
        },
      },
      inputProps: {
        textContentType: 'familyName',
        autoComplete: 'name',
        autoCapitalize: 'words',
        placeholder: 'Smith',
      },
    },
    Numeric: {
      inputProps: {
        keyboardType: 'numeric',
      },
    },
    Privacy: {},
    Time: {
      inputProps: {
        keyboardType: 'numeric',
      },
    },
  }
}

/**
 * Generic component that renders an input component controlled and validated with react-hook-form
 */
export function ControlledInput<TFieldValues extends FieldValues>({
  controllerProps,
  inputProps,
  type,
  submitError,
}: IControlledInput<TFieldValues>): ReactElement {
  const inputTypeDefaultProps = InputTypeDefaultProps<TFieldValues>()[type]
  const { caption, ...unionInputProps } = {
    ...inputTypeDefaultProps.inputProps,
    ...inputProps,
  }
  const unionControlProps = {
    ...inputTypeDefaultProps.controllerProps,
    ...controllerProps,
  }

  return (
    <Controller
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
        if (type === InputType.PHOTO) {
          return (
            <ImageUpload
              label={inputProps?.label?.toString()}
              uri={(value as ImageInfo)?.uri}
              onChange={onChange}
              error={error}
            />
          )
        } else if (type === InputType.TIME) {
          return (
            <TimeInput inputProps={unionInputProps} onChange={onChange} onBlur={onBlur} error={error} value={value} />
          )
        } else if (type === InputType.PRIVACY) {
          return (
            <PrivacySelect
              error={error}
              placeholder={inputProps?.placeholder?.toString()}
              onChange={onChange}
              value={value}
              label={inputProps?.label?.toString()}
              caption={inputProps?.caption?.toString()}
            />
          )
        } else {
          return (
            <Input
              returnKeyType='next'
              numberOfLines={type === InputType.TEXTAREA ? 4 : 1}
              multiline={type === InputType.TEXTAREA}
              onBlur={onBlur}
              textAlignVertical={type === InputType.TEXTAREA ? 'top' : undefined}
              onChangeText={(e) => (type === InputType.NUMERIC ? onChange(stringToNumber(e)) : onChange(e))}
              value={
                type === InputType.NUMERIC
                  ? (value && numberToString(Number(value))) || ''
                  : (value && String(value)) || ''
              }
              status={error || !!submitError ? 'danger' : undefined}
              caption={submitError ? submitError?.message : error?.message || caption}
              {...unionInputProps}
            />
          )
        }
      }}
      {...unionControlProps}
    />
  )
}
