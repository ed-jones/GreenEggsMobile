import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Mutations } from '@greeneggs/core';
import {
  login, loginVariables, LoginInput,
} from '@greeneggs/types/graphql';
import { ToastAndroid } from 'react-native';

const EmptyLoginForm: LoginInput = {
  email: '',
  password: '',
};

export type ILoginForm = [
  state: LoginInput,
  setState: (field: string, value: string) => void,
  loginMutation: () => void,
];

export default function useLoginForm(loginInput: LoginInput = EmptyLoginForm): ILoginForm {
  const [loginFormState, setLoginFormState] = useState<LoginInput>(loginInput);
  const [loginMutation] = useMutation<login, loginVariables>(Mutations.LOGIN, {
    onCompleted: () => {
      ToastAndroid.show('Logging In', ToastAndroid.SHORT);
    },
    onError: ({ message }) => {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    },
    variables: { loginDetails: loginFormState },
  });

  const updateLoginFormState = (field: string, value: string) => {
    setLoginFormState({ ...loginFormState, [field]: value });
  };

  return [loginFormState, updateLoginFormState, loginMutation];
}
