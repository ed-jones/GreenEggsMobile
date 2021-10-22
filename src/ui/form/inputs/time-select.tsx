/**
 * Author: Edward Jones
 */
import { InputProps, Text, ThemedComponentProps, useTheme, withStyles } from "@ui-kitten/components";
import React, { useState } from "react";
import {
  DeepMap,
  DeepPartial,
  FieldError,
  Path,
  PathValue,
  UnionLike,
} from "react-hook-form";
import { View } from "react-native";
import { Input } from '@greeneggs/ui';

import { numberToString, stringToNumber } from "./utils";

interface ITimeFields {
  hours?: number | null;
  minutes?: number | null;
}

interface ITimeInput<FieldValues> {
  value: PathValue<FieldValues, Path<FieldValues>>;
  onChange: (...event: any[]) => void;
  error?:
  | DeepMap<
      DeepPartial<UnionLike<PathValue<FieldValues, Path<FieldValues>>>>,
      FieldError
    >
  | undefined;
  inputProps?: InputProps;
  onBlur: () => void;
}

export const millisecondsToHoursAndMinutes = <FieldValues,>(
  milliseconds: PathValue<FieldValues, Path<FieldValues>>
): ITimeFields => {
  if (milliseconds === null) {
    return {
      hours: null,
      minutes: null,
    };
  }
  const totalMinutes = Number(milliseconds) / (1000 * 60);
  return {
    hours: Math.floor(totalMinutes / 60),
    minutes: Math.floor(totalMinutes % 60),
  };
};

export const hoursAndMinutesToMilliseconds = ({
  hours,
  minutes,
}: ITimeFields): number | null => {
  if (hours === null && minutes === null) {
    return null;
  }
  const hoursAsMilliseconds = (hours || 0) * 60 * 60 * 1000;
  const minutesAsMilliseconds = (minutes || 0) * 60 * 1000;
  return hoursAsMilliseconds + minutesAsMilliseconds;
};

/**
 * Input component for time fields
 */
export const TimeInput = <FieldValues,>({
  value,
  inputProps,
  error,
  onChange,
}: ITimeInput<FieldValues> & ThemedComponentProps) => {
  const theme = useTheme()
  const handleChange = ({
    hours: newHours,
    minutes: newMinutes,
  }: ITimeFields) => {
    const { hours: oldHours, minutes: oldMinutes } =
      millisecondsToHoursAndMinutes(value);

    const milliseconds = hoursAndMinutesToMilliseconds({
      hours: newHours !== null ? newHours || oldHours : null,
      minutes: newMinutes !== null ? newMinutes || oldMinutes : null,
    });

    onChange(numberToString(milliseconds));
  };

  const TextColor = error
  ? theme?.["color-danger-500"]
  : theme?.["color-basic-400"];

  return (
    <>
      <Text appearance="hint" category="label" style={{ marginBottom: 4 }}>
        {inputProps?.label?.toString()}
      </Text>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: 'white',
          borderRadius: 4,
          alignItems: 'center',
          borderWidth: 1,
          borderColor: TextColor
        }}
      >
        <Input
          {...{
            ...inputProps,
            label: undefined,
            style: { borderWidth: 0 },
            placeholder: "0",
            status: error ? "danger" : undefined,
            value: numberToString<FieldValues>(
              millisecondsToHoursAndMinutes(value).hours || null
            ),
            onChangeText: (hours) =>
              handleChange({ hours: stringToNumber(hours) }),
          }}
        />
        <Text style={{color: theme?.["color-basic-600"]}}>:</Text>
        <Input
          {...{
            ...inputProps,
            label: undefined,
            placeholder: "00",
            status: error ? "danger" : undefined,
            style: {borderWidth: 0, flexGrow: 1},
            value: numberToString<FieldValues>(
              millisecondsToHoursAndMinutes(value).minutes || null
            ),
            onChangeText: (minutes) =>
              handleChange({ minutes: stringToNumber(minutes) }),
          }}
        />
      </View>
      <Text
          category="c1"
          style={{
            marginTop: 6,
            color: TextColor,
            marginBottom: 6,
          }}
        >
          {error?.message}
        </Text>
    </>
  );
};
