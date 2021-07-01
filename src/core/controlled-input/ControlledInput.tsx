import React from "react";
import { Controller, ControllerProps } from "react-hook-form";
import { Input, InputProps } from "@ui-kitten/components";
import { ErrorFragment } from "@greeneggs/types/graphql";

export enum InputType {
  TEXT = "Text",
  EMAIL = "Email",
  PASSWORD = "Password",
}

export interface IControlledInput<FieldValues> {
  controllerProps: Omit<ControllerProps<FieldValues>, "render">;
  inputProps?: InputProps;
  submitError?: ErrorFragment | null;
  type: InputType;
}

// This is the interface for the object for default props for each input type
// Name and render fields are omitted as they are always already defined
interface IInputTypeDefaultProps<FieldValues> {
  controllerProps?: Omit<ControllerProps<FieldValues>, "name" | "render">;
  inputProps?: InputProps;
}

// This object stores the default props associated with each input type
// These values can be overwritten
// Example props include form validation rules for emails and passwords
const InputTypeDefaultProps = <FieldValues,>(): Record<
  InputType,
  IInputTypeDefaultProps<FieldValues>
> => ({
  Email: {
    inputProps: {
      label: "EMAIL",
      textContentType: "emailAddress",
      autoCompleteType: "email",
      autoCapitalize: "none",
    },
    controllerProps: {
      rules: {
        maxLength: { value: 100, message: "Must be under 100 characters" },
        required: { value: true, message: "This field is required" },
        pattern: {
          value:
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: "Not an email address",
        },
      },
    },
  },
  Text: {},
  Password: {
    inputProps: {
      label: "PASSWORD",
      textContentType: "password",
      autoCompleteType: "password",
      secureTextEntry: true,
    },
    controllerProps: {
      rules: {
        maxLength: { value: 100, message: "Must be under 100 characters" },
        minLength: { value: 4, message: "Must be over 4 characters" },
        required: { value: true, message: "This field is required" },
      },
    },
  },
});
const ControlledInput = <
  FieldValues extends Record<keyof FieldValues, string | number>
>({
  controllerProps,
  inputProps,
  type,
  submitError,
}: IControlledInput<FieldValues>) => {
  const inputTypeDefaultProps = InputTypeDefaultProps<FieldValues>()[type];

  return (
    <Controller<FieldValues>
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <Input
          onBlur={onBlur}
          onChangeText={onChange}
          value={String(value)}
          status={error || !!submitError ? "danger" : undefined}
          caption={submitError ? submitError.message : error?.message}
          {...{ ...inputTypeDefaultProps.inputProps, ...inputProps }}
        />
      )}
      {...{ ...inputTypeDefaultProps.controllerProps, ...controllerProps }}
    />
  );
};

export default ControlledInput;
