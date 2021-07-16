import { Input, InputProps } from "@ui-kitten/components";
import React from "react";
import { FieldError, Path, PathValue } from "react-hook-form";
import { numberToString, stringToNumber } from "./ControlledInput";

interface ITimeFields {
  hours?: number | null;
  minutes?: number | null;
}

interface ITimeInput<FieldValues> {
  value: PathValue<FieldValues, Path<FieldValues>>;
  onChange: (...event: any[]) => void;
  error?: FieldError;
  inputProps?: InputProps;
  onBlur: () => void;
}

export const millisecondsToHoursAndMinutes = (milliseconds: number) => {
  const totalMinutes = milliseconds / (1000 * 60);
  return {
    hours: Math.floor(totalMinutes / 60),
    minutes: Math.floor(totalMinutes % 60),
  };
};

export const hoursAndMinutesToMilliseconds = ({
  hours,
  minutes,
}: ITimeFields) => {
  const hoursAsMilliseconds = (hours || 0) * 60 * 60 * 1000;
  const minutesAsMilliseconds = (minutes || 0) * 60 * 1000;
  const milliseconds = hoursAsMilliseconds + minutesAsMilliseconds;
  return milliseconds != 0 ? milliseconds : null;
};

const TimeInput = <FieldValues,>({
  value,
  inputProps,
  error,
  onChange,
}: ITimeInput<FieldValues>) => {
  const handleChange = ({
    hours: newHours,
    minutes: newMinutes,
  }: ITimeFields) => {
    const milliseconds = hoursAndMinutesToMilliseconds({
      hours: newHours || null,
      minutes: newMinutes || null,
    });

    onChange(milliseconds);
  };
  const i = 1000 * 60 * 60 * 5;
  console.log(i);
  console.log(hoursAndMinutesToMilliseconds(millisecondsToHoursAndMinutes(i)));

  return (
    <>
      <Input
        {...{
          ...{
            label: "HOURS",
            status: error ? "danger" : undefined,
            caption: error?.message,
            value: numberToString(
              millisecondsToHoursAndMinutes(Number(value)).hours
            ),
            onChangeText: (hours) =>
              handleChange({ hours: stringToNumber(hours) }),
          },
          ...inputProps,
        }}
      />
      <Input
        {...{
          ...{
            label: "MINUTES",
            status: error ? "danger" : undefined,
            caption: error?.message,
            value: numberToString(
              millisecondsToHoursAndMinutes(Number(value)).minutes
            ),
            onChangeText: (minutes) =>
              handleChange({ minutes: stringToNumber(minutes) }),
          },
          ...inputProps,
        }}
      />
    </>
  );
};

export default TimeInput;
