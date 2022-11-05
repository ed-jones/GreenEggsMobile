/**
 * Author: Edward Jones
 */
import { IForm, useForm } from '@greeneggs/ui/form'
import { login, loginVariables, LoginInput } from '@greeneggs/types/graphql'
import { Mutations } from '@greeneggs/graphql'
import { UseFormProps } from 'react-hook-form'

/**
 * Hook that sets up a login form with our custom useForm hook
 */
export const useLoginForm = (args?: UseFormProps<LoginInput>): IForm<LoginInput, login, loginVariables> =>
  useForm<LoginInput, login, loginVariables>(Mutations.login, 'loginDetails', undefined, args)
