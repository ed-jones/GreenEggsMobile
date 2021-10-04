import React, { useState, FC, createContext } from 'react';
import { RecipeFilter, Sort } from '@greeneggs/types/graphql';

export interface SearchState {
  query?: string;
  filter: RecipeFilter;
  sort: Sort;
}

export const defaultSearchState: SearchState = {
  query: undefined,
  filter: {
    ingredients: undefined,
    categories:undefined,
    allergies: undefined,
    diets: undefined,
    cookTime: undefined,
    user: undefined,
  },
  sort: Sort.RELEVANT,
}

interface ISearchContext {
  searchState: SearchState,
  setSearchState?: (searchState: SearchState) => void,
}

export const SearchContext = createContext<ISearchContext>({
  searchState: defaultSearchState,
  setSearchState: undefined 
});

const SearchStateProvider: FC = ({ children }) => {
  const [searchState, setSearchState] = useState<SearchState>(defaultSearchState);

  return (
    <SearchContext.Provider value={{searchState, setSearchState}}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchStateProvider;
