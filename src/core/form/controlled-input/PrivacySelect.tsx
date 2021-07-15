import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import React from "react";
import { FieldError, FieldValues, Path, PathValue } from "react-hook-form";

interface IPrivacySelect {
  label?: string;
  caption?: string;
  value: PathValue<FieldValues, Path<FieldValues>>;
  onChange: (...event: any[]) => void;
  placeholder?: string;
  error?: FieldError;
}

const Options = [
  { title: "EVERYONE", value: "PUBLIC" },
  { title: "FRIENDS", value: "FRIENDS" },
  { title: "ONLY ME", value: "PRIVATE" },
];

const PrivacySelect = ({
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

export default PrivacySelect;
