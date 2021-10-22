/**
 * Author: Edward Jones
 */
import { useForm } from "@greeneggs/ui";
import { Mutations } from '@greeneggs/graphql';
import { signup, signupVariables, SignupInput } from "@greeneggs/types/graphql";
/**
 * Hook that sets up a sign up form with our custom useForm hook
 */
export const useSignupForm = () =>
  useForm<SignupInput, signup, signupVariables>(
    Mutations.SIGNUP,
    "signupDetails"
  );
