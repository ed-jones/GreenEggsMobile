/**
 * Author: Edward Jones
 */
import { IForm, useForm } from '@greeneggs/ui/form'
import { Mutations } from '@greeneggs/graphql'
import { signup, signupVariables, SignupInput } from '@greeneggs/types/graphql'
import { UseFormProps } from 'react-hook-form'
/**
 * Hook that sets up a sign up form with our custom useForm hook
 */
export const useSignupForm = (
  reactHookFormProps?: UseFormProps<SignupInput>
): IForm<SignupInput, signup, signupVariables> =>
  useForm<SignupInput, signup, signupVariables>({
    Mutation: Mutations.signup,
    mutationVariableName: 'signupDetails',
    reactHookFormProps,
  })
