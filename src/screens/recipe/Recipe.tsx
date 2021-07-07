import React from "react";
import { useQuery } from "@apollo/client";
import { ImageBackground, View, StyleSheet, ScrollView } from "react-native";
import { Icons, Queries } from "@greeneggs/core";
import {
  Spinner,
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
import RecipeTopComments from "./RecipeTopComments";

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

  if (loading || !data || !data.recipe.data) return <Spinner />;
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
      <ScrollView>
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
            Top Comments
          </Text>
          <RecipeTopComments />
        </View>
      </ScrollView>
    </ParallaxHeader>
  );
};

export default Recipe;
