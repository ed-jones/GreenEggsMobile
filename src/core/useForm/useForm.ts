import { DocumentNode, MutationHookOptions, useMutation } from '@apollo/client';
import { useState } from 'react';
import { ToastAndroid } from 'react-native';

type SetFormField = (field: string, value: string | number | null) => void;

export type IForm<InputType> = [
  formFields: InputType,
  setFormField: SetFormField,
  submitForm: () => void,
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

  const setFormField: SetFormField = (field, value) => {
    setState({
      ...state,
      [Object.keys(state)[0]]: {
        ...state[Object.keys(state)[0] as keyof MutationVariables],
        [field]: value,
      },
    });
  };

  const [submitForm] = useMutation<MutationType, MutationVariables>(Mutation, {
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

  const formFields = state[Object.keys(state)[0] as keyof MutationVariables] as InputType;
  return [formFields, setFormField, submitForm];
}
