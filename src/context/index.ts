/* eslint-disable @typescript-eslint/naming-convention */
import { Dispatch, SetStateAction, createContext } from 'react'
import {
  addRecipe,
  addRecipeVariables,
  NotificationCount,
  RecipeInput,
  RecipeFilter,
  Sort,
  Me_me_data,
} from '@greeneggs/types/graphql'
import { ISteps } from '@greeneggs/screens/add-recipe/use-steps'
import { IForm } from '@greeneggs/ui/form'
import { UseFieldArrayReturn } from 'react-hook-form'
import { ApolloQueryResult, OperationVariables } from '@apollo/client'

export type Token = string | undefined | null
export type SetToken = Dispatch<SetStateAction<Token>> | undefined
export interface AddRecipeContextInterface {
  form?: IForm<RecipeInput, addRecipe, addRecipeVariables>
  steps?: ISteps
  categoriesFieldArray?: UseFieldArrayReturn<RecipeInput, 'categories', 'id'>
  ingredientsFieldArray?: UseFieldArrayReturn<RecipeInput, 'ingredients', 'id'>
  stepsFieldArray?: UseFieldArrayReturn<RecipeInput, 'steps', 'id'>
  allergiesFieldArray?: UseFieldArrayReturn<RecipeInput, 'allergies', 'id'>
  dietsFieldArray?: UseFieldArrayReturn<RecipeInput, 'diets', 'id'>
}

export interface NotificationState {
  unreadCount: number
}

export const defaultNotificationState: NotificationState = {
  unreadCount: 0,
}

export interface NotificationContextInterface {
  notificationState: NotificationState
  setNotificationState?: (notificationState: NotificationState) => void
  refetchNotificationState?: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<NotificationCount>>
}

export interface SearchState {
  query?: string
  filter: RecipeFilter
  sort: Sort
}

export type Me = Me_me_data | undefined
export type SetMe = ((me: Me) => void) | undefined

// eslint-disable-next-line @typescript-eslint/naming-convention
export const UserContext = createContext({
  me: undefined as Me,
  setMe: undefined as SetMe,
})

export const defaultSearchState: SearchState = {
  query: undefined,
  filter: {
    ingredients: undefined,
    categories: undefined,
    allergies: undefined,
    diets: undefined,
    cookTime: undefined,
    user: undefined,
  },
  sort: Sort.RELEVANT,
}

export interface ISearchContext {
  searchState: SearchState
  setSearchState?: (searchState: SearchState) => void
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SearchContext = createContext<ISearchContext>({
  searchState: defaultSearchState,
  setSearchState: undefined,
})

export const NotificationContext = createContext<NotificationContextInterface>({
  notificationState: defaultNotificationState,
  setNotificationState: undefined,
  refetchNotificationState: undefined,
})

export const AddRecipeContext = createContext<AddRecipeContextInterface>({})

export const AuthContext = createContext({
  token: undefined as Token,
  setToken: undefined as SetToken,
})
