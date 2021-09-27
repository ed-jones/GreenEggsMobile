import React, { FC, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import {
  Text,
  Button,
  TopNavigation,
  TopNavigationAction,
  Avatar,
  Input,
  Layout,
} from "@ui-kitten/components";
import { useQuery } from "@apollo/client";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Alert, Icons, Queries, noavatar } from "@greeneggs/core";
import {
  Me,
  RecipeFilter,
  recipes,
  recipesVariables,
  recipes_recipes_data,
  Sort,
} from "@greeneggs/types/graphql";
import LoadingScreen from "../loading/LoadingScreen";
import RecipeCardSmall from "@greeneggs/core/recipe-card-small";
import { useNavigation } from "@react-navigation/core";
import { FlatList } from "react-native-gesture-handler";
import LazyList from "@greeneggs/core/lazy-list";

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

interface MyRecipesProps {
  query: string;
  userId: string;
}

const MyRecipes: FC<MyRecipesProps> = ({ query, userId }) => {
  const navigation = useNavigation();

  return (
    <LazyList<
      recipes,
      recipesVariables,
      recipes_recipes_data,
      Sort,
      RecipeFilter
    >
      query={Queries.GET_RECIPES}
      variables={{
        query: query,
        sort: Sort.NEW,
        filter: {
          user: userId,
        },
      }}
      dataKey="recipes"
      emptyMessage="You haven't uploaded any recipes! Once you've uploaded some recipes they'll be shown here."
      errorMessage="No recipes found!"
      renderItem={({ item: myRecipe }) => (
        <View style={{ marginBottom: 16, marginHorizontal: 16 }}>
          <RecipeCardSmall
            recipe={myRecipe}
            onPress={() =>
              navigation.navigate("Recipe", {
                recipeId: myRecipe.id,
              })
            }
          />
        </View>
      )}
    />
  );
};

const MyProfile = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const meResult = useQuery<Me>(Queries.ME);
  const [myRecipeQuery, setMyRecipeQuery] = useState("");

  if (meResult.loading) {
    return <LoadingScreen />;
  }

  if (meResult.error) {
    return <Alert message="There was an error" type="danger" />;
  }

  const me = meResult.data?.me.data;

  if (me === undefined || me === null) {
    return <Text>Error! User not found</Text>;
  }

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
      />
      <View style={styles.avatarContainer}>
        <Pressable onPress={() => navigation.navigate("EditProfilePicture")}>
          <Avatar
            style={styles.avatar}
            shape="round"
            size="giant"
            source={me.avatarURI ? { uri: me.avatarURI } : noavatar}
          />
        </Pressable>
      </View>
      <View style={styles.profileContainer}>
        <Text category="h5">{`${me.firstName} ${me.lastName}`}</Text>
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
        {optional(me.bio)}
      </Text>
      <View style={styles.statContainer}>
        <ProfileStat label="Following" value={me.followingCount.toString()} />
        <ProfileStat label="Followers" value={me.followerCount.toString()} />
        <ProfileStat label="Recipes" value={me.recipeCount.toString()} />
        <ProfileStat label="Likes" value={me.likeCount.toString()} />
      </View>
      <Input
        placeholder="Search recipes"
        size="large"
        style={styles.search}
        accessoryLeft={Icons.Search}
        value={myRecipeQuery}
        onChangeText={(newText) => setMyRecipeQuery(newText)}
      />
      <MyRecipes query={myRecipeQuery} userId={me.id} />
    </Layout>
  );
};

export default MyProfile;
