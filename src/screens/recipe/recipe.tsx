/**
 * Author: Dimitri Zvolinski
 */
import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ImageBackground, View, StyleSheet } from "react-native";
import { Mutations, Queries } from "@greeneggs/graphql";
import {
  Icon,
  IndexPath,
  SelectItem,
  Text,
  TopNavigationAction,
} from "@ui-kitten/components";
import { recipe, recipeVariables } from "@greeneggs/types/graphql";
import ParallaxHeader from "@fabfit/react-native-parallax-header";
import { LinearGradient } from "expo-linear-gradient";
import { RecipeDetailsCard } from "./recipe-details-card";
import { RecipeAllergies } from "./recipe-allergies";
import { RecipeIngredients } from "./recipe-ingredients";
import { RecipeDirections } from "./recipe-directions";
import { RecipeCommentList } from "./recipe-comment-list";
import { LoadingScreen } from "../loading-screen";
import { RecipeAddComment } from "./recipe-add-comment";
import {
  TopNavigation,
  Background,
  ViewMore,
  SaveRecipeButton,
  EmptyState,
  Select,
} from "@greeneggs/ui";
import { RecipeMoreButton } from "./recipe-more-button";
import { UserContext } from "@greeneggs/providers";

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
    marginVertical: 24,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});

export const Recipe = ({ route, navigation }: any) => {
  const { recipeId } = route.params;
  const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(0));
  const { me } = useContext(UserContext);
  const { loading, error, data } = useQuery<recipe, recipeVariables>(
    Queries.GET_RECIPE,
    {
      variables: { recipeId },
      onCompleted: (data) => setSelectedIndex(new IndexPath((data.recipe.data?.servingCount ?? 0) - 1))
    }
  );

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
            <>
              <SaveRecipeButton recipeId={recipeId} saved={recipe.saved} />
              { me?.id === recipe.submittedBy.id ? <RecipeMoreButton recipeId={recipeId} /> : undefined }
            </>
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text category="h5" style={styles.heading}>
            Ingredients
          </Text>
          {recipe.servingCount ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text category="label" style={{marginRight: 16 }}>SERVES</Text>
              <Select
                selectedIndex={selectedIndex}
                onSelect={(args) => {
                  setSelectedIndex(args);
                }}
                value={() => <Text>{selectedIndex.toString()}</Text>}
                >
                {[...Array(Math.max(recipe.servingCount, 10)).keys()].map((number) => (
                  <SelectItem title={number + 1}/>
                ))}
              </Select>
            </View>
          ) : undefined}
        </View>
        {recipe.ingredients.length > 0 ? (
          <RecipeIngredients ingredients={recipe.ingredients} servingCount={Number(selectedIndex) + 1} defaultServingCount={recipe.servingCount} />
        ) : (
          <View style={{ paddingVertical: 16 }}>
            <EmptyState description="This recipe has no ingredients." />
          </View>
        )}
        <Text category="h5" style={styles.heading}>
          Steps
        </Text>
        {recipe.steps.length > 0 ? (
          <RecipeDirections directions={recipe.steps} />
        ) : (
          <View style={{ paddingVertical: 16 }}>
            <EmptyState description="This recipe has no steps." />
          </View>
        )}
        <Text category="h5" style={styles.heading}>
          {`Comments (${recipe.commentCount.toString()})`}
        </Text>
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
        <View style={{ marginTop: 24 }}>
          <RecipeAddComment recipeId={recipe.id} />
        </View>
      </Background>
    </ParallaxHeader>
  );
};
