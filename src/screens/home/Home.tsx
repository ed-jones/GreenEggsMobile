import React from "react";
import HomeTabs from "./home-tabs/HomeTabs";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TopBar } from "@greeneggs/core";
import { Image, StyleSheet, View } from "react-native";
import logo512 from "@greeneggs/core/logo/logo512.png";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  logo: {
    width: 48,
    height: 48,
    marginRight: 16,
  },
});

const Home = ({}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <>
      <View style={{ marginTop: insets.top }}>
        <TopBar
          inputProps={{ onFocus: () => navigation.navigate("RecipeSearch") }}
          accessoryLeft={<Image source={logo512} style={styles.logo} />}
        />
      </View>
      <HomeTabs />
    </>
  );
};

export default Home;
