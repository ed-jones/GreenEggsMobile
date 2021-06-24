import React from 'react';

import { Button, Input, Text } from '@ui-kitten/components';

import useSignupForm from './useSignUpForm';
import AuthPageTemplate from './AuthPageTemplate';
import { setContext } from '@apollo/client/link/context';

const Signup = ({ navigation }: any) => {
  const [signupForm, setSignupForm, [submitSignupForm]] = useSignupForm();

  async function handleSignupFormSubmit() {
    const result = await submitSignupForm();
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
        value={signupForm.firstName}
        textContentType="givenName"
        autoCompleteType="name"
        autoCapitalize="words"
        autoFocus
        onChangeText={(nextValue) => setSignupForm('firstName', nextValue)}
      />
      <Input
        label="LAST NAME"
        value={signupForm.lastName}
        textContentType="familyName"
        autoCompleteType="name"
        autoCapitalize="words"
        onChangeText={(nextValue) => setSignupForm('lastName', nextValue)}
      />
      <Input
        label="EMAIL"
        value={signupForm.email}
        textContentType="emailAddress"
        autoCompleteType="email"
        autoCapitalize="none"
        onChangeText={(nextValue) => setSignupForm('email', nextValue)}
      />
      <Input
        label="PASSWORD"
        value={signupForm.password}
        textContentType="password"
        autoCompleteType="password"
        secureTextEntry
        onChangeText={(nextValue) => setSignupForm('password', nextValue)}
      />
      <Input
        label="CONFIRM PASSWORD"
        value={signupForm.confirmPassword}
        textContentType="password"
        autoCompleteType="password"
        secureTextEntry
        onChangeText={(nextValue) => setSignupForm('confirmPassword', nextValue)}
      />
      <Button onPress={handleSignupFormSubmit}>SIGN UP</Button>
    </AuthPageTemplate>
  );
};

export default Signup;
