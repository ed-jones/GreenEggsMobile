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

const InputTypeDefaultProps: Record<InputType, InputProps> = {
  Email: {
    label: "EMAIL",
    textContentType: "emailAddress",
    autoCompleteType: "email",
    autoCapitalize: "none",
  },
  Text: {},
  Password: {
    label: "PASSWORD",
    textContentType: "password",
    autoCompleteType: "password",
    secureTextEntry: true,
  },
};

const ControlledInput = <
  FieldValues extends Record<keyof FieldValues, string | number>
>({
  controllerProps,
  inputProps,
  type,
  submitError,
}: IControlledInput<FieldValues>) => {
  const inputTypeDefaultProps = InputTypeDefaultProps[type];

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
          {...{ ...inputTypeDefaultProps, ...inputProps }}
        />
      )}
      {...controllerProps}
    />
  );
};

export default ControlledInput;
