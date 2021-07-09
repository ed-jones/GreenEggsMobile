/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Icon, IconProps } from "@ui-kitten/components";

export const Settings = (props: IconProps) => (
  <Icon {...props} name="settings" />
);

export const Back = (props: IconProps) => (
  <Icon {...props} name="chevron-left-outline" />
);

export const Forward = (props: IconProps) => (
  <Icon {...props} name="chevron-right-outline" />
);

export const Down = (props: IconProps) => (
  <Icon {...props} name="chevron-down-outline" />
);

export const Warning = (props: IconProps) => (
  <Icon {...props} name="alert-triangle" />
);

export const Publish = (props: IconProps) => (
  <Icon {...props} name="upload-outline" />
);

export const Add = (props: IconProps) => (
  <Icon {...props} name="plus-outline" />
);
