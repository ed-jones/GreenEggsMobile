import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ImageBackground, View, StyleSheet } from "react-native";
import { Mutations, Queries } from "@greeneggs/graphql";
import {
  Icon,
  Text,
  TopNavigationAction,
} from "@ui-kitten/components";
import { recipe, recipeVariables } from "@greeneggs/types/graphql";
import ParallaxHeader from "@fabfit/react-native-parallax-header";
import { LinearGradient } from "expo-linear-gradient";
import RecipeDetailsCard from "./recipe-details-card";
import RecipeAllergies from "./recipe-allergies";
import RecipeIngredients from "./recipe-ingredients";
import RecipeDirections from "./recipe-directions";
import RecipeCommentList from "./recipe-comment-list";
import LoadingScreen from "../loading-screen";
import RecipeAddComment from "./recipe-add-comment";
import { TopNavigation, Background, ViewMore } from "@greeneggs/ui";

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

  const [saveRecipe] = useMutation(Mutations.SAVE_RECIPE, {
    variables: { recipeId },
    refetchQueries: [Queries.GET_RECIPE, "recipe", Queries.GET_SAVED_RECIPES],
  });

  const [unsaveRecipe] = useMutation(Mutations.UNSAVE_RECIPE, {
    variables: { recipeId },
    refetchQueries: [Queries.GET_RECIPE, "recipe", Queries.GET_SAVED_RECIPES],
  });

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
          style={{ height: 64, alignItems: "flex-start" }}
          accessoryRight={() => (
            <TopNavigationAction
              icon={(iconProps) =>
                recipe.saved ? (
                  <Icon {...iconProps} name="bookmark" />
                ) : (
                  <Icon {...iconProps} name="bookmark-outline" />
                )
              }
              onPress={() => (recipe.saved ? unsaveRecipe() : saveRecipe())}
            />
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
      <Background style={styles.content}>
        <RecipeDetailsCard {...recipe} navigation={navigation} />
        <RecipeAllergies allergies={recipe.allergies} />
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
        <View style={{ marginBottom: 24 }}>
          <RecipeAddComment recipeId={recipe.id} />
        </View>
        <RecipeCommentList comments={recipe.comments.slice(0, 3)} />
        {recipe.comments.length >= 3 && (
          <ViewMore
            style={{ marginHorizontal: -16 }}
            onPress={() =>
              navigation.navigate("RecipeAllComments", {
                comments: recipe.comments,
                commentCount: recipe.commentCount,
                recipeId: recipe.id,
              })
            }
          />
        )}
      </Background>
    </ParallaxHeader>
  );
};

export default Recipe;
