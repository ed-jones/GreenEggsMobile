import React from 'react';
import { View } from 'react-native';
import { Text, Button } from '@ui-kitten/components';

const Welcome = () => (
  <View>
    <Text category="h1">Green Eggs</Text>
    <Text category="s1">A friendly recipe sharing experience</Text>
    <Button>LOGIN</Button>
    <Button>CONTINUE AS GUEST</Button>
    <Text>OR CONTINUE WITH</Text>
    <Button>GOOGLE</Button>
    <Button>FACEBOOK</Button>
    <Button>TWITTER</Button>
    <Text>Don&apos;t have an account? Create New Account</Text>
  </View>
);

export default Welcome;
