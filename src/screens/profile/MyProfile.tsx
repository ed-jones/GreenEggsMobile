import React from "react";
import { Image, View, StyleSheet, SafeAreaView, ScrollView, RefreshControl } from "react-native";
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
import { recipes } from "@greeneggs/types/graphql";
import { Queries, Icons } from "@greeneggs/core";

import {
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import LoadingScreen from "../loading/LoadingScreen";
import RecipeCard from "../home/recipe-card/RecipeCard";

const CardVerticalMargin = 20;
const CardHorizontalMargin = 24;

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
  button: {height: 35},
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
    paddingRight: 8,
    flexBasis: "auto",
    flexGrow: 1,
  },
  searchContainer: {
    margin: 16,
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  firstCard: {
    marginTop: CardVerticalMargin,
  },
  card: {
    marginBottom: CardVerticalMargin,
    marginHorizontal: CardHorizontalMargin,
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

  const { loading, error, data, refetch } = useQuery<recipes>(
    Queries.GET_RECIPES
  );

  if (loading) return <LoadingScreen />;
  if (error) {
    return <Text>Error! {error.message}</Text>;
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
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search recipes"
          size="large"
          style={styles.search}
          accessoryLeft={Icons.Search}
        />
        <Button size="small" style={styles.button} accessoryLeft={Icons.Filter}/>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
      >
        {data?.recipes.data?.map((recipe, i: number) => (
          <View
            key={recipe?.id}
            style={
              i === 0 ? { ...styles.firstCard, ...styles.card } : styles.card
            }
          >
            <RecipeCard
              recipe={recipe!}
              onPress={() =>
                navigation.navigate("Recipe", { recipeId: recipe?.id })
              }
            />
          </View>
        ))}
      </ScrollView>

    </Layout>
  );
};

export default MyProfile;
