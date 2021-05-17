import { DocumentNode, MutationHookOptions, useMutation } from '@apollo/client';
import { useState } from 'react';
import { ToastAndroid } from 'react-native';

export type IForm<InputType> = [
  state: InputType,
  setFormField: (field: string, value: string | number | null) => void,
  mutation: () => void,
];

export default function useForm<
  InputType,
  MutationType,
  MutationVariables extends Record<keyof MutationVariables, InputType>,
>(
  Mutation: DocumentNode,
  defaultInput: MutationVariables,
  options?: MutationHookOptions<MutationType, MutationVariables>,
): IForm<InputType> {
  const [state, setState] = useState<MutationVariables>(defaultInput);

  const setFormField = (field: string, value: string | number | null) => {
    setState({
      ...state,
      [Object.keys(state)[0]]: {
        ...state[Object.keys(state)[0] as keyof MutationVariables],
        [field]: value,
      },
    });
  };

  const [mutation] = useMutation<MutationType, MutationVariables>(Mutation, {
    onCompleted: () => {
      setState(defaultInput);
      ToastAndroid.show('Form Submitted', ToastAndroid.SHORT);
    },
    onError: ({ message }) => {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    },
    variables: state,
    ...options,
  });

  return [state[Object.keys(state)[0] as keyof MutationVariables], setFormField, mutation];
}
