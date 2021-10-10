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
  withStyles,
  ThemedComponentProps,
} from "@ui-kitten/components";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import TopNavigationGeneric from "@greeneggs/core/top-navigation-generic";

import Logo from "../../assets/images/icon.png";
import Banner from "../../assets/images/banner.jpg";

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
    message,
    children,
    eva,
  }: IAuthPageTemplateProps & ThemedComponentProps) => (
    <>
      <StatusBar style="dark" />
      <View style={styles.bannerContainer}>
        <ImageBackground source={Banner} style={styles.banner}>
          <LinearGradient
            colors={["rgba(247, 249, 252,0.5)", "rgba(247, 249, 252,1)"]}
            style={styles.gradient}
          />
          <TopNavigationGeneric />
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
  )
);

export default AuthPageTemplate;
