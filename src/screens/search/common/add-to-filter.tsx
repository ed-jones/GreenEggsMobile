/**
 * Author: Victor Ying
 */
import React from 'react'
import { FilterControlGroup } from '../common'

export interface AddToFilterProps {
  filterCount: number
  clearFilters?: () => void
  addToFilter?: () => void
}

/**
 * Control group component for adding and clearing recipes from an overall filter.
 */
export function AddToFilter({ filterCount, clearFilters, addToFilter }: AddToFilterProps) {
  return (
    <FilterControlGroup
      label={`${filterCount.toString()} FILTERS SELECTED`}
      clearButton={{ title: 'CLEAR FILTERS', onPress: () => clearFilters?.() }}
      applyButton={{ title: 'SAVE CHANGES', onPress: () => addToFilter?.() }}
    />
  )
}
