import React from 'react';
import { View } from 'react-native';
import { Text, Button } from '@ui-kitten/components';

const Welcome = ({ navigation }: any) => (
  <View>
    <Text category="h1">Green Eggs</Text>
    <Text category="s1">A friendly recipe sharing experience</Text>
    <Button onPress={() => navigation.navigate('Signup')}>CREATE ACCOUNT</Button>
    <Button onPress={() => navigation.navigate('Home')}>CONTINUE AS GUEST</Button>
    <Text>Already have an account?</Text>
    <Text onPress={() => navigation.navigate('Login')}>Login</Text>
    {/* <Text>OR CONTINUE WITH</Text>
    <Button>GOOGLE</Button>
    <Button>FACEBOOK</Button>
    <Button>TWITTER</Button>
    <Text>Don&apos;t have an account? Create New Account</Text> */}
  </View>
);

export default Welcome;
