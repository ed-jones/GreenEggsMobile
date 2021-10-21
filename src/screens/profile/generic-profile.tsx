/**
 * Author: Andrew Wilkie
 */
import React, { FC, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import {
  Text,
  Button,
  TopNavigation,
  TopNavigationAction,
  Avatar,
} from "@ui-kitten/components";
import {
  Input,
  Background,
  LazyList,
  RecipeCardSmall,
  Callout,
  Icons,
  LazyListProps,
  FollowButton,
} from "@greeneggs/ui";
import { useMutation, useQuery } from "@apollo/client";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { noAvatar } from "@greeneggs/assets";
import { Queries, Mutations } from "@greeneggs/graphql";
import {
  FollowUser,
  profile,
  RecipeFilter,
  recipes,
  recipesVariables,
  recipes_recipes_data,
  Sort,
} from "@greeneggs/types/graphql";
import { LoadingScreen } from "../loading-screen";
import { useNavigation } from "@react-navigation/core";

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
    paddingHorizontal: 16,
    paddingBottom: 16,
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
  onPress?: () => void;
}

const ProfileStat = ({ label, value, onPress }: IProfileStat) => (
  <Pressable onPress={onPress}>
    <View style={styles.statBox}>
      <Text category="label">{value}</Text>
      <Text category="c1">{label}</Text>
    </View>
  </Pressable>
);

interface MyRecipesProps
  extends Omit<
    Partial<LazyListProps<recipes, recipesVariables, recipes_recipes_data>>,
    "query"
  > {
  query: string;
  userId: string;
}

const MyRecipes: FC<MyRecipesProps> = ({ query, userId, ...props }) => {
  const navigation = useNavigation();

  return (
    <LazyList<
      recipes,
      recipesVariables,
      recipes_recipes_data,
      Sort,
      RecipeFilter
    >
      {...props}
      query={Queries.GET_RECIPES}
      variables={{
        query: query,
        sort: Sort.NEW,
        filter: {
          user: userId,
        },
      }}
      dataKey="recipes"
      emptyMessage="This user hasn't uploaded any recipes."
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

interface GenericProfileProps {
  userId: string;
  isMe?: boolean;
}

export const GenericProfile = ({
  userId,
  isMe = false,
}: GenericProfileProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const profileResult = useQuery<profile>(Queries.GET_PROFILE, {
    variables: {
      userId,
    },
  });

  const [myRecipeQuery, setMyRecipeQuery] = useState("");

  if (profileResult.loading) {
    return <LoadingScreen />;
  }

  if (profileResult.error) {
    return <Callout message="There was an error" type="danger" />;
  }

  const profile = profileResult.data?.profile.data;

  if (profile === undefined || profile === null) {
    return <Text>Error! User not found</Text>;
  }

  function optional(value: string | number | null | undefined) {
    return value?.toString() || "";
  }

  return (
    <Background style={{ ...styles.view }}>
      <TopNavigation
        style={{ backgroundColor: "transparent", paddingTop: insets.top }}
        accessoryLeft={() => {
          return isMe ? (
            <TopNavigationAction
              icon={Icons.Settings}
              onPress={() => navigation.navigate("Settings")}
            />
          ) : (
            <TopNavigationAction
              icon={Icons.Back}
              onPress={() => navigation.goBack()}
            />
          );
        }}
      />
      <MyRecipes
        query={myRecipeQuery}
        userId={profile.id}
        extraData={myRecipeQuery}
        ListHeaderComponent={
          <>
            <View style={styles.avatarContainer}>
              <Pressable
                onPress={() => isMe && navigation.navigate("EditProfilePicture")}
              >
                <Avatar
                  style={styles.avatar}
                  shape="round"
                  size="giant"
                  source={
                    profile.avatarURI ? { uri: profile.avatarURI } : noAvatar
                  }
                />
              </Pressable>
            </View>
            <View style={styles.profileContainer}>
              <Text category="h5">{`${profile.firstName} ${profile.lastName}`}</Text>
              {isMe ? (
                <Button
                  size="small"
                  style={styles.button}
                  accessoryLeft={Icons.Edit}
                  onPress={() => navigation.navigate("EditProfile")}
                >
                  EDIT
                </Button>
              ) : (
                <FollowButton isFollowing={profile.isFollowing ?? false} userId={userId} />
              )}
            </View>
            {profile.bio ? (
              <Text style={styles.description} numberOfLines={2}>
                {optional(profile.bio)}
              </Text>
            ) : undefined}
            <View style={styles.statContainer}>
              <ProfileStat
                label="Following"
                value={profile.followingCount.toString()}
                onPress={() => navigation.navigate("Following", { userId })}
              />
              <ProfileStat
                label="Followers"
                value={profile.followerCount.toString()}
                onPress={() => navigation.navigate("Followers", { userId })}
              />
              <ProfileStat
                label="Recipes"
                value={profile.recipeCount.toString()}
              />
              <ProfileStat label="Likes" value={profile.likeCount.toString()} />
            </View>
            <Input
              placeholder="Search recipes"
              size="large"
              style={styles.search}
              accessoryLeft={Icons.Search}
              value={myRecipeQuery}
              onChangeText={(newText) => setMyRecipeQuery(newText)}
            />
          </>
        }
      />
    </Background>
  );
};
