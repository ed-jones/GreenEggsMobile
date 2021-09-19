import React from "react";
import { useQuery } from "@apollo/client";
import { ImageBackground, View, StyleSheet } from "react-native";
import { Icons, Queries } from "@greeneggs/core";
import {
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { recipe, recipeVariables } from "@greeneggs/types/graphql";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import ParallaxHeader from "@fabfit/react-native-parallax-header";
import { LinearGradient } from "expo-linear-gradient";
import RecipeDetailsCard from "./RecipeDetailsCard";
import RecipeAllergies from "./RecipeAllergies";
import RecipeCategoriesTags from "./RecipeCategoriesTags";
import RecipeIngredients from "./RecipeIngredients";
import RecipeDirections from "./RecipeDirections";
import RecipeCommentList from "./RecipeCommentList";
import LoadingScreen from "../loading/LoadingScreen";
import RecipeAddComment from "./RecipeAddComment";

const styles = StyleSheet.create({
  coverPhoto: {
    width: "100%",
    height: undefined,
    aspectRatio: 1 / 1,
    resizeMode: "cover",
  },
  content: {
    padding: 16,
  },
  cardSection: {
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    marginRight: 10,
  },
  heading: {
    marginVertical: 16,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});

const Recipe = ({ route, navigation }: any) => {
  const { recipeId } = route.params;

  const { loading, error, data } = useQuery<recipe, recipeVariables>(
    Queries.GET_RECIPE,
    {
      variables: { recipeId },
    }
  );

  const navigateBack = () => {
    navigation.goBack();
  };
  const insets = useSafeAreaInsets();

  if (loading || !data || !data.recipe.data) return <LoadingScreen />;
  if (error || data.recipe.error)
    return <Text>{error?.message || data.recipe.error?.message}</Text>;

  const { data: recipe } = data.recipe;

  return (
    <ParallaxHeader
      maxHeight={300}
      minHeight={64}
      renderOverlay={() => (
        <TopNavigation
          style={{
            backgroundColor: "transparent",
            paddingTop: insets.top,
            alignItems: "flex-start",
          }}
          accessoryLeft={() => (
            <TopNavigationAction icon={Icons.Back} onPress={navigateBack} />
          )}
        />
      )}
      renderHeader={() => (
        <ImageBackground
          source={{ uri: recipe.coverImage }}
          style={styles.coverPhoto}
        >
          <LinearGradient
            colors={["rgba(247, 249, 252,0.4)", "rgba(247, 249, 252,0)"]}
            style={styles.gradient}
          />
        </ImageBackground>
      )}
    >
      <StatusBar style="dark" />
      <View style={styles.content}>
        <RecipeDetailsCard {...recipe} navigation={navigation} />
        <RecipeAllergies allergies={recipe.allergies} />
        <Text category="h5" style={styles.heading}>
          Categories
        </Text>
        <RecipeCategoriesTags categories={recipe.categories} />
        <Text category="h5" style={styles.heading}>
          Ingredients
        </Text>
        <RecipeIngredients ingredients={recipe.ingredients} />
        <Text category="h5" style={styles.heading}>
          Directions
        </Text>
        <RecipeDirections directions={recipe.steps} />
        <Text category="h5" style={styles.heading}>
          {`Comments (${recipe.commentCount.toString()})`}
        </Text>
        <RecipeCommentList
          comments={recipe.comments.slice(0, 3)}
          viewMore={() =>
            navigation.navigate("RecipeAllComments", {
              comments: recipe.comments,
              commentCount: recipe.commentCount,
              recipeId: recipe.id,
            })
          }
        />
        <View style={{ marginTop: 24 }}>
          <RecipeAddComment recipeId={recipe.id} />
        </View>
      </View>
    </ParallaxHeader>
  );
};

export default Recipe;
