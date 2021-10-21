/**
 * Author: Victor Ying
 */
import React, { FC } from 'react';
import { FilterControlGroup } from '../common';

export interface AddToFilterProps {
  filterCount: number;
  clearFilters?: () => void;
  addToFilter?: () => void;
}

export const AddToFilter: FC<AddToFilterProps> = ({ filterCount, clearFilters, addToFilter }) => {
  return (
    <FilterControlGroup
      label={`${filterCount.toString()} FILTERS SELECTED`}
      clearButton={{ title: "CLEAR FILTERS", onPress: () => clearFilters?.() }}
      applyButton={{ title: "SAVE CHANGES", onPress: () => addToFilter?.() }}
    />
  );
}
