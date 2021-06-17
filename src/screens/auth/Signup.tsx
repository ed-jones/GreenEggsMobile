import React from 'react';
import { View } from 'react-native';
import {
  Text, Button, TopNavigation, TopNavigationAction, Input,
} from '@ui-kitten/components';
import { Icons } from '@greeneggs/core';

import useLoginForm from './useLoginForm';

const Signup = ({ navigation }: any) => {
  const [loginForm, setLoginForm, submitLoginForm] = useLoginForm();

  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <View>
      <TopNavigation
        accessoryLeft={() => <TopNavigationAction icon={Icons.Back} onPress={navigateBack}/>}
        title="Green Eggs"
      />
      <Text category="s1">A friendly recipe sharing experience</Text>
      <Input
        label="EMAIL"
        value={loginForm.email}
        onChangeText={(nextValue) => setLoginForm('email', nextValue)}
      />
      {/* <Input
        label="FIRST NAME"
        value={loginForm.firstName}
        onChangeText={(nextValue) => setLoginForm('firstName', nextValue)}
      />
      <Input
        label="LAST NAME"
        value={loginForm.lastName}
        onChangeText={(nextValue) => setLoginForm('lastName', nextValue)}
      /> */}
      <Input
        label="PASSWORD"
        value={loginForm.password}
        onChangeText={(nextValue) => setLoginForm('password', nextValue)}
      />
      {/* <Input
        label="CONFIRM PASSWORD"
        value={loginForm.confirmPassword}
        onChangeText={(nextValue) => setLoginForm('confirmPassword', nextValue)}
      /> */}
      <Button onPress={submitLoginForm}>LOGIN</Button>
      <Text>OR</Text>
      <Button>CREATE NEW ACCOUNT</Button>
    </View>
  );
};

export default Signup;
