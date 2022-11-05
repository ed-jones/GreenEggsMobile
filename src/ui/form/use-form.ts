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
import {
  FieldValues,
  useForm as useReactHookForm,
  UseFormProps as UseReactHookFormProps,
  UseFormReturn,
} from 'react-hook-form'

export interface IForm<InputType extends FieldValues, MutationType, MutationVariables>
  extends UseFormReturn<InputType> {
  formResult: MutationResult<MutationType>
  submitForm: (
    options?: MutationFunctionOptions<MutationType, MutationVariables> | undefined
  ) => Promise<FetchResult<MutationType>>
}

interface UseFormProps<InputType extends FieldValues, MutationType, MutationVariables> {
  Mutation: DocumentNode
  mutationVariableName: keyof MutationVariables
  options?: MutationHookOptions<MutationType, MutationVariables>
  reactHookFormProps?: UseReactHookFormProps<InputType>
}

/*
 *  Custom hook that combines the functionality of react-hook-form
 *  with type safe apollo mutations
 */
export function useForm<
  InputType extends FieldValues,
  MutationType,
  MutationVariables extends Record<keyof MutationVariables, InputType>
>({
  Mutation,
  mutationVariableName,
  options,
  reactHookFormProps,
}: UseFormProps<InputType, MutationType, MutationVariables>): IForm<InputType, MutationType, MutationVariables> {
  const reactHookForm = useReactHookForm<InputType>(reactHookFormProps)

  const variables = {
    [mutationVariableName]: reactHookForm.getValues(),
  } as MutationVariables
  const [submitForm, formResult] = useMutation<MutationType, MutationVariables>(Mutation, {
    variables,
    ...options,
  })

  return { ...reactHookForm, formResult, submitForm }
}
