import React from "react";
import {
  Controller,
  ControllerProps,
  Path,
  PathValue,
  RegisterOptions,
} from "react-hook-form";
import { Input, InputProps } from "@ui-kitten/components";
import { ErrorFragment } from "@greeneggs/types/graphql";

// Function that converts JS numbers to strings in a way
// that avoids NaN, undefined, etc.
function numberToString<FieldValues>(
  number: PathValue<FieldValues, Path<FieldValues>>
): string {
  if (number === NaN) {
    return "";
  }
  if (number === 0) {
    return "0";
  }
  if (number === null) {
    return "";
  }
  if (String(number) === "NaN") {
    return "";
  }
  return String(number);
}

// Function that converts string input to numbers in a
// way that avoids NaN, undefined, etc.
function stringToNumber(string: string): number | null {
  if (string === "") {
    return null;
  }
  if (Number(string) == NaN) {
    return 0;
  }
  return Number(string);
}

// Data types that can be used by this component
// Includes form validation, styling and other behaviour
export enum InputType {
  TEXT = "Text",
  EMAIL = "Email",
  PASSWORD = "Password",
  FIRSTNAME = "FirstName",
  LASTNAME = "LastName",
  NUMERIC = "Numeric",
}

export interface IControlledInput<FieldValues> {
  controllerProps: Omit<ControllerProps<FieldValues>, "render">;
  inputProps?: InputProps;
  submitError?: ErrorFragment | null;
  type: InputType;
}

// This object exists in order to reuse common form validation rules
export const Rules: Record<
  string,
  Omit<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs">
> = {
  REQUIRED: { required: { value: true, message: "This field is required" } },
  UNDER100CHARS: {
    maxLength: { value: 100, message: "Must be under 100 characters" },
  },
};

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
        ...Rules.REQUIRED,
        ...Rules.UNDER100CHARS,
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
        ...Rules.REQUIRED,
        ...Rules.UNDER100CHARS,
        minLength: { value: 4, message: "Must be over 4 characters" },
      },
    },
  },
  FirstName: {
    controllerProps: {
      rules: {
        ...Rules.REQUIRED,
        ...Rules.UNDER100CHARS,
      },
    },
    inputProps: {
      textContentType: "givenName",
      autoCompleteType: "name",
      autoCapitalize: "words",
    },
  },
  LastName: {
    controllerProps: {
      rules: {
        ...Rules.REQUIRED,
        ...Rules.UNDER100CHARS,
      },
    },
    inputProps: {
      textContentType: "familyName",
      autoCompleteType: "name",
      autoCapitalize: "words",
    },
  },
  Numeric: {
    inputProps: {
      keyboardType: "numeric",
    },
  },
});

const ControlledInput = <
  FieldValues extends Record<keyof FieldValues, string | number | object>
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
          onChangeText={(e) =>
            type === InputType.NUMERIC
              ? onChange(stringToNumber(e))
              : onChange(e)
          }
          value={
            type === InputType.NUMERIC
              ? (value && numberToString(value)) || ""
              : (value && String(value)) || ""
          }
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
