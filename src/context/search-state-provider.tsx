/**
 * Author: Edward Jones
 */
import React, { useState, PropsWithChildren } from 'react'
import { defaultSearchState, SearchContext, SearchState } from './index'
/**
 * Provider that lets all child components access the search state, including query, sorting and filtering.
 */
export function SearchStateProvider({ children }: PropsWithChildren<object>) {
  const [searchState, setSearchState] = useState<SearchState>(defaultSearchState)

  return <SearchContext.Provider value={{ searchState, setSearchState }}>{children}</SearchContext.Provider>
}
