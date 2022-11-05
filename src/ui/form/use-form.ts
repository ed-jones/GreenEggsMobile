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
  UseFormReturn as UseReactHookFormReturn,
} from 'react-hook-form'

export interface UseFormReturn<TInputType extends FieldValues, TMutationType, TMutationVariables>
  extends UseReactHookFormReturn<TInputType> {
  formResult: MutationResult<TMutationType>
  submitForm: (
    options?: MutationFunctionOptions<TMutationType, TMutationVariables> | undefined
  ) => Promise<FetchResult<TMutationType>>
}

interface UseFormProps<TInputType extends FieldValues, TMutationType, TMutationVariables> {
  Mutation: DocumentNode
  mutationVariableName: keyof TMutationVariables
  options?: MutationHookOptions<TMutationType, TMutationVariables>
  reactHookFormProps?: UseReactHookFormProps<TInputType>
}

/*
 *  Custom hook that combines the functionality of react-hook-form
 *  with type safe apollo mutations
 */
export function useForm<
  TInputType extends FieldValues,
  TMutationType,
  TMutationVariables extends Record<keyof TMutationVariables, TInputType>
>({
  Mutation,
  mutationVariableName,
  options,
  reactHookFormProps,
}: UseFormProps<TInputType, TMutationType, TMutationVariables>): UseFormReturn<
  TInputType,
  TMutationType,
  TMutationVariables
> {
  const reactHookForm = useReactHookForm<TInputType>(reactHookFormProps)

  const variables = {
    [mutationVariableName]: reactHookForm.getValues(),
  } as TMutationVariables
  const [submitForm, formResult] = useMutation<TMutationType, TMutationVariables>(Mutation, {
    variables,
    ...options,
  })

  return { ...reactHookForm, formResult, submitForm }
}
