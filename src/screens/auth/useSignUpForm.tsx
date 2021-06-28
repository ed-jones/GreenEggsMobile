import { Mutations, useForm } from '@greeneggs/core';
import {
  signup, signupVariables, SignupInput,
} from '@greeneggs/types/graphql';

const EmptySignupForm: signupVariables = {
  signupDetails: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
}

const useSignupForm = () => useForm<SignupInput, signup, signupVariables>(Mutations.SIGNUP, "signupDetails");

export default useSignupForm;
