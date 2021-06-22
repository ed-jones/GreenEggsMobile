import React from 'react';
import { View, StyleSheet, ImageBackground, Image, SafeAreaView } from 'react-native';
import {
  Text, Button, TopNavigation, TopNavigationAction, Input,
} from '@ui-kitten/components';
import { Icons } from '@greeneggs/core';
import useLoginForm from './useLoginForm';
import { setContext } from '@apollo/client/link/context';
import { LinearGradient } from 'expo-linear-gradient';

import Logo from '../../assets/images/icon.png';
import Banner from '../../assets/images/banner.jpg';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaInsetsContext, useSafeAreaInsets } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  logo: {
    width: 48,
    height: 48,
  },
  form: {
    padding: 10,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  bannerContainer: {
    height: "25%",
  },
  bannerContent: {
    alignItems: "center",
    paddingBottom: 64,
  },
  banner: {
    resizeMode: "cover",
    height: "100%",
    justifyContent: "flex-start",
  },
  view: {
    backgroundColor: "#F7F9FC",
    height: "100%"
  },
  centerText: {
    textAlign: "center",
  },
});

const Login = ({ navigation }: any) => {
  const [loginForm, setLoginForm, [submitLoginForm]] = useLoginForm();

  const navigateBack = () => {
    navigation.goBack();
  };

  async function handleLoginFormSubmit() {
    const result = await submitLoginForm();
    const token = result.data?.login.data?.token;
    if (token) {
      setContext((_request, _previousContext) => ({
        headers: { 
          authorization: token
        },
      }));
      navigation.navigate('Home');
    }
  }

  const insets = useSafeAreaInsets();
  
  return (
    <View style={styles.view}>
      <StatusBar style="dark" />
      <View style={styles.bannerContainer}>
        <ImageBackground source={Banner} style={styles.banner}>
          <LinearGradient
            colors={['rgba(247, 249, 252,0.5)', 'rgba(247, 249, 252,1)']}
            style={styles.gradient}
          />
          <TopNavigation
            style={{backgroundColor: "transparent", paddingTop: insets.top}}
            accessoryLeft={() => <TopNavigationAction icon={Icons.Back} onPress={navigateBack}/>}
          />
          <Text category="h1" style={styles.centerText}>
            <Image source={Logo} style={styles.logo}/>
            Green Eggs
          </Text>
          <Text style={styles.centerText} category="s1">Log in to view and share recipes with your friends</Text>
        </ImageBackground>
      </View>
      <View style={styles.form}>
        <Input
          label="EMAIL"
          value={loginForm.email}
          onChangeText={(nextValue) => setLoginForm('email', nextValue)}
        />
        <Input
          label="PASSWORD"
          value={loginForm.password}
          onChangeText={(nextValue) => setLoginForm('password', nextValue)}
        />
        <Button onPress={handleLoginFormSubmit}>LOGIN</Button>
      </View>
    </View>
  );
};

export default Login;
