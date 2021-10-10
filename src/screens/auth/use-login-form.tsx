import { useForm } from '@greeneggs/ui';
import {
  login, loginVariables, LoginInput,
} from '@greeneggs/types/graphql';
import { Mutations } from '@greeneggs/graphql';

export const useLoginForm = () => useForm<LoginInput, login, loginVariables>(Mutations.LOGIN, "loginDetails");
