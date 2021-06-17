import React from 'react';
import { View, Image, StyleSheet, ImageBackground } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import Logo from '../../assets/images/icon.png';
import Banner from '../../assets/images/banner.jpg';
import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
  },
  banner: {
    resizeMode: "cover",
    height: "100%",
    justifyContent: "flex-end",
  },
  bannerContainer: {
    height: "50%",
  },
  bannerContent: {
    alignItems: "center",
    paddingBottom: 64,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  buttonContainer: {
    padding: 16,
    flexDirection: "column",
    justifyContent: "space-between",
    height: "50%"
  },
  button: {
    marginBottom: 8,
  },
  view: {
    backgroundColor: "#F7F9FC",
    height: "100%"
  }
});

const Welcome = ({ navigation }: any) => (
  <View style={styles.view}>
    <View style={styles.bannerContainer}>
      <ImageBackground source={Banner} style={styles.banner}>
        <LinearGradient
          colors={['transparent', 'rgba(247, 249, 252,1)']}
          style={styles.gradient}
        />
        <View style={styles.bannerContent}>
          <Image source={Logo} style={styles.logo}/>
          <Text category="h1">Green Eggs</Text>
          <Text category="s1">A friendly recipe sharing experience</Text>
        </View>
      </ImageBackground>
    </View>
    <View style={styles.buttonContainer}>
      <View>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate('Signup')}
          status="success"
        >
          CREATE ACCOUNT
        </Button>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
          status="basic"
        >
          CONTINUE AS GUEST
        </Button>
      </View>
      <View>
        <Text>Already have an account?</Text>
        <Text style={{fontWeight: "bold"}} onPress={() => navigation.navigate('Login')}>Login</Text>
      </View>
    </View>
    {/* <Text>OR CONTINUE WITH</Text>
    <Button>GOOGLE</Button>
    <Button>FACEBOOK</Button>
    <Button>TWITTER</Button>
    <Text>Don&apos;t have an account? Create New Account</Text> */}
  </View>
);

export default Welcome;
