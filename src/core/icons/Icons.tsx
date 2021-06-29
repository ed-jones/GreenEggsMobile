/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Icon } from '@ui-kitten/components';

export const Settings = (props: any) => (
  <Icon {...props} name="settings" />
);

export const Back = (props: any) => (
  <Icon {...props} name="chevron-left-outline" />
);

export const Down = (props: any) => (
  <Icon {...props} name="chevron-down-outline" />
);

export const Warning = (props: any) => (
  <Icon {...props} name="alert-triangle" />
);
