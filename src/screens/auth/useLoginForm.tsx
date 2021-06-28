import { Mutations, useForm } from '@greeneggs/core';
import {
  login, loginVariables, LoginInput,
} from '@greeneggs/types/graphql';

const useLoginForm = () => useForm<LoginInput, login, loginVariables>(Mutations.LOGIN, "loginDetails", "Incorrect email or password");

export default useLoginForm;
