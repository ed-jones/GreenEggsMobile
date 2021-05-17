import { Mutations, useForm } from '@greeneggs/core';
import {
  login, loginVariables, LoginInput,
} from '@greeneggs/types/graphql';

const useLoginForm = () => useForm<LoginInput, login, loginVariables>(Mutations.LOGIN);

export default useLoginForm;
