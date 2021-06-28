import React from 'react';

import { Button, Input } from '@ui-kitten/components';

import useSignupForm from './useSignUpForm';
import AuthPageTemplate from './AuthPageTemplate';
import { setContext } from '@apollo/client/link/context';

const Signup = ({ navigation }: any) => {
  const {formFields, setFormField, submitForm} = useSignupForm();

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
      <Input
        label="FIRST NAME"
        value={formFields.firstName}
        textContentType="givenName"
        autoCompleteType="name"
        autoCapitalize="words"
        autoFocus
        onChangeText={(nextValue) => setFormField('firstName', nextValue)}
      />
      <Input
        label="LAST NAME"
        value={formFields.lastName}
        textContentType="familyName"
        autoCompleteType="name"
        autoCapitalize="words"
        onChangeText={(nextValue) => setFormField('lastName', nextValue)}
      />
      <Input
        label="EMAIL"
        value={formFields.email}
        textContentType="emailAddress"
        autoCompleteType="email"
        autoCapitalize="none"
        onChangeText={(nextValue) => setFormField('email', nextValue)}
      />
      <Input
        label="PASSWORD"
        value={formFields.password}
        textContentType="password"
        autoCompleteType="password"
        secureTextEntry
        onChangeText={(nextValue) => setFormField('password', nextValue)}
      />
      <Input
        label="CONFIRM PASSWORD"
        value={formFields.confirmPassword}
        textContentType="password"
        autoCompleteType="password"
        secureTextEntry
        onChangeText={(nextValue) => setFormField('confirmPassword', nextValue)}
      />
      <Button onPress={handleSignupFormSubmit}>SIGN UP</Button>
    </AuthPageTemplate>
  );
};

export default Signup;
