import { useForm } from "@greeneggs/ui";
import { Mutations } from '@greeneggs/graphql';
import { signup, signupVariables, SignupInput } from "@greeneggs/types/graphql";

export const useSignupForm = () =>
  useForm<SignupInput, signup, signupVariables>(
    Mutations.SIGNUP,
    "signupDetails"
  );
