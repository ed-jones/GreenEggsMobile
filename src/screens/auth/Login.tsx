import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button, Input, Spinner,
} from '@ui-kitten/components';
import useLoginForm from './useLoginForm';
import { setContext } from '@apollo/client/link/context';
import AuthPageTemplate from './AuthPageTemplate';
import { Controller } from 'react-hook-form';

const styles = StyleSheet.create({
  forgotPassword: {
    fontWeight: "bold",
    textAlign: "right",
    paddingTop: 8,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
  }
});

const Login = ({ navigation }: any) => {
  const {formResult, handleSubmit, control, submitForm} = useLoginForm();

  async function onSubmit() {
    const result = await submitForm();
    const token = result.data?.login.data?.token;
    const error = result.data?.login.error;
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
    <AuthPageTemplate navigation={navigation} message="Log in to view and share recipes with your friends">
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
            autoFocus
            status={
              error || formResult.data?.login.error ? "danger" : undefined
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
              error || formResult.data?.login.error ? "danger" : undefined
            }
            caption={formResult.data?.login.error?.message || error?.message}
          />
        )}
        name="password"
        defaultValue=""
      />
      {/* <Text category="p2" style={styles.forgotPassword}>Forgot Password?</Text> */}
      <Button
        onPress={handleSubmit(onSubmit)}
        disabled={formResult.loading}
        accessoryLeft={formResult.loading ? () => <Spinner size='small'/> : undefined}
      >
        LOGIN
      </Button>
    </AuthPageTemplate>
  );
};

export default Login;
