import React, { FC } from 'react';
import FilterControlGroup from '@greeneggs/core/filter-control-group';

export interface AddToFilterProps {
  filterCount: number;
}

const AddToFilter: FC<AddToFilterProps> = ({ filterCount }) => {
  return (
    <FilterControlGroup
      label={`${filterCount.toString()} FILTERS ADDED`}
      clearButton={{ title: "CLEAR FILTERS", onPress: () => undefined }}
      applyButton={{ title: "ADD TO FILTER", onPress: () => undefined }}
    />
  );
}

export default AddToFilter;
