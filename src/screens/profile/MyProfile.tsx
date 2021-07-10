import React from "react";
import { Image, View, StyleSheet, SafeAreaView } from "react-native";
import {
  Text,
  Button,
  Icon,
  TopNavigation,
  TopNavigationAction,
  Avatar,
  Input,
  Layout,
} from "@ui-kitten/components";

import {
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Icons } from "@greeneggs/core";

const styles = StyleSheet.create({
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  avatar: {
    margin: 8,
    width: 120,
    height: 120,
  },
  view: {
    // backgroundColor: "#F7F9FC",
    height: "100%",
  },
  description: {
    padding: 16,
  },
  button: {},
  topButton: {
    width: 24,
    height: 24,
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
  profileContainer: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 16,
  },
  statBox: {
    flexDirection: "column",
    alignItems: "center",
  },
  search: {
    backgroundColor: "white",
    margin: 16,
  },
});

interface IProfileStat {
  label: string;
  value: string;
}

const ProfileStat = ({ label, value }: IProfileStat) => (
  <View style={styles.statBox}>
    <Text category="label">{value}</Text>
    <Text category="c1">{label}</Text>
  </View>
);

const MyProfile = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <Layout level="2" style={{ ...styles.view }}>
      <TopNavigation
        style={{ backgroundColor: "transparent", paddingTop: insets.top }}
        accessoryLeft={() => (
          <TopNavigationAction
            icon={Icons.Settings}
            onPress={() => navigation.navigate("Settings")}
          />
        )}
        accessoryRight={() => (
          <>
            <TopNavigationAction
              icon={Icons.AddPerson}
              onPress={navigateBack}
            />
            <TopNavigationAction icon={Icons.More} onPress={navigateBack} />
          </>
        )}
      />
      <View style={styles.avatarContainer}>
        <Avatar
          style={styles.avatar}
          shape="round"
          size="giant"
          source={require("../../assets/images/banner.jpg")}
        />
      </View>
      <View style={styles.profileContainer}>
        <Text category="h5">John Davies</Text>
        <Button size="small" style={styles.button} accessoryLeft={Icons.Edit}>
          EDIT
        </Button>
      </View>
      <Text style={styles.description} numberOfLines={2}>
        Wannabe writer. Incurable entrepreneur. Food lover. Zombie junkie. Music
        buff.
      </Text>
      <View style={styles.statContainer}>
        <ProfileStat label="Following" value="51" />
        <ProfileStat label="Followers" value="104" />
        <ProfileStat label="Recipes" value="18" />
        <ProfileStat label="Likes" value="356" />
      </View>
      <Input
        placeholder="Search recipes"
        size="large"
        style={styles.search}
        accessoryLeft={Icons.Search}
      />
    </Layout>
  );
};

export default MyProfile;
