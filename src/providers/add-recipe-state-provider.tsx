import React, { useState, FC, createContext } from 'react';
import { addRecipe, addRecipeVariables, RecipeInput } from '@greeneggs/types/graphql';
import { IForm } from '@greeneggs/ui';
import { useRecipeForm } from '@greeneggs/screens/add-recipe/use-recipe-form';

export interface AddRecipeState {
  form: IForm<RecipeInput, addRecipe, addRecipeVariables> | undefined;
}

export const defaultAddRecipeState: AddRecipeState = {
  form: undefined
}

export interface AddRecipeContextInterface {
  addRecipeState: AddRecipeState,
  setAddRecipeState?: (addRecipeState: AddRecipeState) => void,
}

export const AddRecipeContext = createContext<AddRecipeContextInterface>({
  addRecipeState: defaultAddRecipeState,
  setAddRecipeState: undefined,
});

export const AddRecipeStateProvider: FC = ({ children }) => {
  const [addRecipeState, setAddRecipeState] = useState<AddRecipeState>({
    ...defaultAddRecipeState,
    form: useRecipeForm(),
  });

  return (
    <AddRecipeContext.Provider value={{addRecipeState, setAddRecipeState}}>
      {children}
    </AddRecipeContext.Provider>
  );
};
