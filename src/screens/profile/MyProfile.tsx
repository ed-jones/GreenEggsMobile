import React, { FC, useEffect, useState } from "react";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
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
  recipes,
  recipesVariables,
  recipes_recipes_data,
  Sort,
} from "@greeneggs/types/graphql";
import LoadingScreen from "../loading/LoadingScreen";
import RecipeCardSmall from "@greeneggs/core/recipe-card-small";
import { useNavigation } from "@react-navigation/core";
import { FlatList } from "react-native-gesture-handler";

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
  const limit = 2;
  const [done, setDone] = useState(false);
  const [recipesState, setRecipesState] = useState<recipes_recipes_data[]>([]);

  useEffect(() => {
    setDone(false);
  }, [query]);

  const myRecipesResult = useQuery<recipes, recipesVariables>(
    Queries.GET_RECIPES,
    {
      variables: {
        offset: 0,
        limit,
        query: query,
        sort: Sort.NEW,
        filter: {
          user: userId,
        },
      },
      onCompleted: (data) => {
        if (data.recipes.data) {
          setRecipesState(data.recipes.data);
        }
      },
    }
  );

  if (myRecipesResult.loading) {
    return <LoadingScreen />;
  }

  if (myRecipesResult.error) {
    return <Alert message="There was an error" type="danger" />;
  }

  if (recipesState === null || recipesState === undefined) {
    return (
      <Alert
        style={{ marginHorizontal: 16 }}
        message="You haven't uploaded any recipes! Once you've uploaded some recipes they'll be shown here."
        type="info"
      />
    );
  }

  if (recipesState.length === 0) {
    return (
      <Alert
        style={{ marginHorizontal: 16 }}
        message="No recipes found!"
        type="info"
      />
    );
  }

  function mergeRecipes(recipes: recipes_recipes_data[]) {
    setRecipesState([...recipesState, ...recipes]);
  }

  async function nextPage() {
    if (!done) {
      const result = await myRecipesResult.fetchMore({
        variables: {
          offset: recipesState.length,
          limit,
          query: query,
          sort: Sort.NEW,
          filter: {
            user: userId,
          },
        },
      });
      if (result.data.recipes.data) {
        if (result.data.recipes.data.length === 0) {
          setDone(true);
        } else {
          mergeRecipes(result.data.recipes.data);
        }
      }
    }
  }

  return (
    <FlatList
      onEndReached={() => nextPage()}
      onEndReachedThreshold={0.5}
      data={recipesState}
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
    ></FlatList>
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
