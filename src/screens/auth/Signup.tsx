import React from 'react';

import { StyleSheet } from 'react-native';
import { Button, Input, Spinner } from '@ui-kitten/components';

import useSignupForm from './useSignUpForm';
import AuthPageTemplate from './AuthPageTemplate';
import { setContext } from '@apollo/client/link/context';
import { Controller } from 'react-hook-form';

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  }
});

const Signup = ({ navigation }: any) => {
  const {formResult, handleSubmit, control, submitForm, getValues} = useSignupForm();

  async function handleSignupFormSubmit() {
    const result = await submitForm();
    const token = result.data?.signup.data?.token;
    const error = result.data?.signup.error;
    if (token && !error) {
      setContext((_request, _previousContext) => ({
        headers: { 
          authorization: token
        },
      }));
      navigation.navigate('Home');
    }
  }

  return (
    <AuthPageTemplate navigation={navigation} message="Sign up to view and share recipes with your friends">
      <Controller
        control={control}
        rules={{
          maxLength: { value: 100, message: "Must be under 100 characters"},
          required: { value: true, message: "This field is required"},
        }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <Input
            style={styles.input}
            label="FIRST NAME"
            textContentType="givenName"
            autoCompleteType="name"
            autoCapitalize="words"
            autoFocus
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            status={
              error || formResult.data?.signup.error ? "danger" : undefined
            }
            caption={error?.message}
          />
        )}
        name="firstName"
        defaultValue=""
      />
      <Controller
        control={control}
        rules={{
          maxLength: { value: 100, message: "Must be under 100 characters"},
          required: { value: true, message: "This field is required"},
        }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <Input
            style={styles.input}
            label="LAST NAME"
            textContentType="familyName"
            autoCompleteType="name"
            autoCapitalize="words"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            status={
              error || formResult.data?.signup.error ? "danger" : undefined
            }
            caption={error?.message}
          />
        )}
        name="lastName"
        defaultValue=""
      />
      <Controller
        control={control}
        rules={{
          maxLength: { value: 100, message: "Must be under 100 characters"},
          required: { value: true, message: "This field is required"},
          pattern: {
              value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Not an email address"
          }
        }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <Input
            style={styles.input}
            label="EMAIL"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            textContentType="emailAddress"
            autoCompleteType="email"
            autoCapitalize="none"
            status={
              error || formResult.data?.signup.error ? "danger" : undefined
            }
            caption={error?.message}
          />
        )}
        name="email"
        defaultValue=""
      />
      <Controller
        control={control}
        rules={{
         maxLength: { value: 100, message: "Must be under 100 characters"},
         minLength: { value: 4, message: "Must be over 4 characters"},
         required: { value: true, message: "This field is required"},
         validate: { value: value => value === getValues("confirmPassword")}

        }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <Input
            style={styles.input}
            label="PASSWORD"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            textContentType="password"
            autoCompleteType="password"
            secureTextEntry
            status={
              error || formResult.data?.signup.error ? "danger" : undefined
            }
            caption={error?.message}
          />
        )}
        name="password"
        defaultValue=""
      />
      <Controller
        control={control}
        rules={{
          maxLength: { value: 100, message: "Must be under 100 characters"},
          minLength: { value: 4, message: "Must be over 4 characters"},
          required: { value: true, message: "This field is required"},
          validate: { value: value => value !== getValues("password") ? "Passwords do not match" : undefined}
        }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <Input
            style={styles.input}
            label="CONFIRM PASSWORD"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            textContentType="password"
            autoCompleteType="password"
            secureTextEntry
            status={
              error || formResult.data?.signup.error ? "danger" : undefined
            }
            caption={formResult.data?.signup.error?.message || error?.message}
          />
        )}
        name="confirmPassword"
        defaultValue=""
      />
      <Button
        onPress={handleSubmit(handleSignupFormSubmit)}
        disabled={formResult.loading}
        accessoryLeft={formResult.loading ? () => <Spinner size='small'/> : undefined}
      >
        SIGN UP
      </Button>
    </AuthPageTemplate>
  );
};

export default Signup;
