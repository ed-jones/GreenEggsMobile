import React from 'react';

import { Text } from '@ui-kitten/components';

import useLoginForm from './useLoginForm';
import AuthPageTemplate from './AuthPageTemplate';

const Signup = ({ navigation }: any) => {
  return (
    <AuthPageTemplate navigation={navigation} message="Sign up to view and share recipes with your friends">
      <Text>Form</Text>
    </AuthPageTemplate>
  );
};

export default Signup;
