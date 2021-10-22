/**
 * Author: Edward Jones
 */
import { useForm } from '@greeneggs/ui';
import {
  login, loginVariables, LoginInput,
} from '@greeneggs/types/graphql';
import { Mutations } from '@greeneggs/graphql';

/**
 * Hook that sets up a login form with our custom useForm hook
 */
export const useLoginForm = () => useForm<LoginInput, login, loginVariables>(Mutations.LOGIN, "loginDetails");
