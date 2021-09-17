import React from "react";
import { Image, View, StyleSheet, SafeAreaView, Pressable } from "react-native";
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
import { useQuery } from "@apollo/client";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Alert, Icons, Queries, noavatar } from "@greeneggs/core";
import { Me } from "@greeneggs/types/graphql";
import LoadingScreen from "../loading/LoadingScreen";

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

  const { loading, error, data } = useQuery<Me>(Queries.ME);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <Alert message="There was an error" type="danger" />;
  }

  const me = data?.me.data;

  function optional(value: string | number | null | undefined) {
    return value?.toString() || "";
  }

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
        <Pressable onPress={() => navigation.navigate("EditProfilePicture")}>
          <Avatar
            style={styles.avatar}
            shape="round"
            size="giant"
            source={me?.avatarURI ? { uri: me?.avatarURI } : noavatar}
          />
        </Pressable>
      </View>
      <View style={styles.profileContainer}>
        <Text category="h5">{`${optional(me?.firstName)} ${optional(
          me?.lastName
        )}`}</Text>
        <Button
          size="small"
          style={styles.button}
          accessoryLeft={Icons.Edit}
          onPress={() => navigation.navigate("EditProfile")}
        >
          EDIT
        </Button>
      </View>
      <Text style={styles.description} numberOfLines={2}>
        {optional(me?.bio)}
      </Text>
      <View style={styles.statContainer}>
        <ProfileStat label="Following" value={optional(me?.followingCount)} />
        <ProfileStat label="Followers" value={optional(me?.followerCount)} />
        <ProfileStat label="Recipes" value={optional(me?.recipeCount)} />
        <ProfileStat label="Likes" value={optional(me?.likeCount)} />
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
