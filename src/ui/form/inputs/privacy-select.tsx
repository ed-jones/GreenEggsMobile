/**
 * Author: Edward Jones
 */
import { IndexPath, SelectItem } from "@ui-kitten/components";
import React from "react";
import {
  DeepMap,
  DeepPartial,
  FieldError,
  FieldValues,
  Path,
  PathValue,
  UnionLike,
} from "react-hook-form";
import { Privacy } from "@greeneggs/types/graphql";
import { Select } from "@greeneggs/ui";
interface IPrivacySelect {
  label?: string;
  caption?: string;
  value: PathValue<FieldValues, Path<FieldValues>>;
  onChange: (...event: any[]) => void;
  placeholder?: string;
  error?:
    | DeepMap<
        DeepPartial<UnionLike<PathValue<FieldValues, Path<FieldValues>>>>,
        FieldError
      >
    | undefined;
}
interface Option {
  title: string;
  value: Privacy;
}
const Options: Option[] = [
  { title: "EVERYONE", value: Privacy.PUBLIC },
  { title: "FRIENDS", value: Privacy.FRIENDS },
  { title: "ONLY ME", value: Privacy.PRIVATE },
];

/**
 * Input component for selecting a privacy option
 */
export const PrivacySelect = ({
  label,
  caption,
  value,
  onChange,
  placeholder,
  error,
}: IPrivacySelect) => (
  <Select
    status={error ? "danger" : undefined}
    value={
      Options.find((option) => option.value === value)?.title ||
      placeholder ||
      "SELECT OPTION"
    }
    style={{ marginBottom: 16 }}
    selectedIndex={
      new IndexPath(Options.findIndex((option) => option.value === value))
    }
    onSelect={(index) =>
      !Array.isArray(index) ? onChange(Options[index.row].value) : undefined
    }
    label={label}
    caption={error?.message || caption}
  >
    {Options.map((option) => (
      <SelectItem title={option.title} key={option.title} />
    ))}
  </Select>
);
