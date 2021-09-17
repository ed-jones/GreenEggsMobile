import { DocumentNode, FetchResult, MutationFunctionOptions, MutationHookOptions, MutationResult, MutationTuple, useMutation } from '@apollo/client';
import { useState } from 'react';
import { Path, SubmitErrorHandler, SubmitHandler, useForm as useReactHookForm, UseFormHandleSubmit, UseFormProps, UseFormReturn } from 'react-hook-form';

export interface IForm<InputType, MutationType, MutationVariables> extends UseFormReturn<InputType> {
  formResult: MutationResult<MutationType>;
  submitForm: (options?: MutationFunctionOptions<MutationType, MutationVariables> | undefined) => Promise<FetchResult<MutationType>>
}

/*
 *  Custom hook that combines the functionality of react-hook-form
 *  with type safe apollo mutations
 */
export default function useForm<
  InputType,
  MutationType,
  MutationVariables extends Record<keyof MutationVariables, InputType>,
>(
  Mutation: DocumentNode,
  mutationVariableName: keyof MutationVariables,
  options?: MutationHookOptions<MutationType, MutationVariables>,
  reactHookFormProps?: UseFormProps<InputType>
): IForm<InputType, MutationType, MutationVariables> {
  const reactHookForm = useReactHookForm<InputType>(reactHookFormProps);

  const variables = { [mutationVariableName]: reactHookForm.getValues() as InputType } as MutationVariables;
  console.log("vars", variables)
  const [submitForm, formResult] = useMutation<MutationType, MutationVariables>(Mutation, {
    variables,
    ...options,
  });
  console.log("error", formResult.error?.networkError)

  return {...reactHookForm, formResult, submitForm};
}
