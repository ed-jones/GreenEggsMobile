import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Text, Button, Input,
} from '@ui-kitten/components';
import useLoginForm from './useLoginForm';
import { setContext } from '@apollo/client/link/context';
import AuthPageTemplate from './AuthPageTemplate';

const styles = StyleSheet.create({
  forgotPassword: {
    fontWeight: "bold",
    textAlign: "right",
    paddingTop: 8,
    paddingBottom: 10,
  }
});

const Login = ({ navigation }: any) => {
  const [loginForm, setLoginForm, [submitLoginForm]] = useLoginForm();

  async function handleLoginFormSubmit() {
    const result = await submitLoginForm();
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
      <Input
        label="EMAIL"
        value={loginForm.email}
        textContentType="emailAddress"
        autoCompleteType="email"
        autoCapitalize="none"
        autoFocus
        onChangeText={(nextValue) => setLoginForm('email', nextValue)}
      />
      <Input
        label="PASSWORD"
        value={loginForm.password}
        textContentType="password"
        autoCompleteType="password"
        secureTextEntry
        onChangeText={(nextValue) => setLoginForm('password', nextValue)}
      />
      <Text category="p2" style={styles.forgotPassword}>Forgot Password?</Text>
      <Button onPress={handleLoginFormSubmit}>LOGIN</Button>
    </AuthPageTemplate>
  );
};

export default Login;
