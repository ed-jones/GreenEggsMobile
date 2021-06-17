import { Mutations, useForm } from '@greeneggs/core';
import {
  login, loginVariables, LoginInput,
} from '@greeneggs/types/graphql';

const EmptyLoginForm: loginVariables = {
  loginDetails: {
    email: '',
    password: '',
  }
}

const useLoginForm = () => useForm<LoginInput, login, loginVariables>(Mutations.LOGIN, EmptyLoginForm);

export default useLoginForm;
