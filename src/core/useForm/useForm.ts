import { DocumentNode, MutationHookOptions, useMutation } from '@apollo/client';
import { useState } from 'react';
import { ToastAndroid } from 'react-native';

export function emptyFormFactory<MutationVariables>(): MutationVariables {
  return { } as MutationVariables;
}

export type IForm<InputType> = [
  state: InputType,
  setFormField: (field: string, value: string) => void,
  mutation: () => void,
];

export default function useForm<
  InputType,
  MutationType,
  MutationVariables extends { [key: string]: InputType | any },
>(
  Mutation: DocumentNode,
  options?: MutationHookOptions<MutationType, MutationVariables>,
  defaultInput: MutationVariables = emptyFormFactory<MutationVariables>(),
) {
  const [state, setState] = useState<MutationVariables>(defaultInput);

  const setFormField = (field: string, value: string) => {
    setState({
      ...state,
      [Object.keys(state)[0]]: {
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

  return [state, setFormField, mutation];
}
