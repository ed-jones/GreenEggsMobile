/**
 * Author: Edward Jones
 */
import {
  DocumentNode,
  FetchResult,
  MutationFunctionOptions,
  MutationHookOptions,
  MutationResult,
  useMutation,
} from '@apollo/client'
import { FieldValues, useForm as useReactHookForm, UseFormProps, UseFormReturn } from 'react-hook-form'

export interface IForm<InputType extends FieldValues, MutationType, MutationVariables>
  extends UseFormReturn<InputType> {
  formResult: MutationResult<MutationType>
  submitForm: (
    options?: MutationFunctionOptions<MutationType, MutationVariables> | undefined
  ) => Promise<FetchResult<MutationType>>
}

/*
 *  Custom hook that combines the functionality of react-hook-form
 *  with type safe apollo mutations
 */
export function useForm<
  InputType extends FieldValues,
  MutationType,
  MutationVariables extends Record<keyof MutationVariables, InputType>
>(
  Mutation: DocumentNode,
  mutationVariableName: keyof MutationVariables,
  options?: MutationHookOptions<MutationType, MutationVariables>,
  reactHookFormProps?: UseFormProps<InputType>
): IForm<InputType, MutationType, MutationVariables> {
  const reactHookForm = useReactHookForm<InputType>(reactHookFormProps)

  const variables = {
    [mutationVariableName]: reactHookForm.getValues() as InputType,
  } as MutationVariables
  const [submitForm, formResult] = useMutation<MutationType, MutationVariables>(Mutation, {
    variables,
    ...options,
  })

  return { ...reactHookForm, formResult, submitForm }
}
