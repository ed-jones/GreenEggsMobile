import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import {
  Text,
  TopNavigation,
  TopNavigationAction,
  withStyles,
  ThemedComponentProps,
} from "@ui-kitten/components";
import { Icons } from "@greeneggs/core";
import { LinearGradient } from "expo-linear-gradient";

import Logo from "../../assets/images/icon.png";
import Banner from "../../assets/images/banner.jpg";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  logo: {
    width: 48,
    height: 48,
    margin: 10,
  },
  form: {
    paddingHorizontal: 10,
    // paddingTop: 664,
    // height: "100%",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  bannerContainer: {
    height: 200,
    justifyContent: "center",
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
  logoText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  centerText: {
    textAlign: "center",
  },
  forgotPassword: {
    fontWeight: "bold",
    textAlign: "right",
    paddingTop: 8,
    paddingBottom: 10,
  },
});

interface IAuthPageTemplateProps {
  navigation: any;
  message: string;
  children: React.ReactNode;
}

const AuthPageTemplate = withStyles(
  ({
    navigation,
    message,
    children,
    eva,
  }: IAuthPageTemplateProps & ThemedComponentProps) => {
    const navigateBack = () => {
      navigation.goBack();
    };
    const insets = useSafeAreaInsets();

    return (
      // <ScrollView
      //   style={{
      //     backgroundColor: eva?.theme && eva.theme["color-basic-200"],
      //   }}
      // >
      <>
        <StatusBar style="dark" />
        <View style={styles.bannerContainer}>
          <ImageBackground source={Banner} style={styles.banner}>
            <LinearGradient
              colors={["rgba(247, 249, 252,0.5)", "rgba(247, 249, 252,1)"]}
              style={styles.gradient}
            />
            <TopNavigation
              style={{ backgroundColor: "transparent", paddingTop: insets.top }}
              accessoryLeft={() => (
                <TopNavigationAction icon={Icons.Back} onPress={navigateBack} />
              )}
            />
            <View style={styles.logoText}>
              <Text category="h1">Green Eggs</Text>
              <Image source={Logo} style={styles.logo} />
            </View>
            <Text style={styles.centerText} category="s1">
              {message}
            </Text>
          </ImageBackground>
        </View>
        <ScrollView
          style={{
            ...styles.form,
            backgroundColor: eva?.theme && eva.theme["color-basic-200"],
          }}
        >
          {children}
        </ScrollView>
      </>
    );
  }
);

export default AuthPageTemplate;
