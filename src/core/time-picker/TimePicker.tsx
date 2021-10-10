import React from 'react';
import { SelectItem } from '@ui-kitten/components';
import { Select } from "@greeneggs/ui/select";

const TimePicker = () => (
  <>
    <Select>
      <SelectItem>0</SelectItem>
      <SelectItem>1</SelectItem>
      <SelectItem>2</SelectItem>
      <SelectItem>3</SelectItem>
      <SelectItem>4</SelectItem>
    </Select>
    <Select>
      <SelectItem>0</SelectItem>
      <SelectItem>15</SelectItem>
      <SelectItem>30</SelectItem>
      <SelectItem>45</SelectItem>
    </Select>
  </>
);

export default TimePicker;
