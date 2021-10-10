import * as React from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "@ui-kitten/components";
import { useQuery } from "@apollo/client";
import { recipes } from "@greeneggs/types/graphql";
import { Queries } from "@greeneggs/graphql";

import { LoadingScreen } from "@greeneggs/screens/loading-screen";
import { RecipeCard } from "./recipe-card";

const CardVerticalMargin = 20;
const CardHorizontalMargin = 24;

const styles = StyleSheet.create({
  firstCard: {
    marginTop: CardVerticalMargin,
  },
  card: {
    marginBottom: CardVerticalMargin,
    marginHorizontal: CardHorizontalMargin,
  },
});

export function AllRecipes({ navigation }: any) {
  const { loading, error, data, refetch } = useQuery<recipes>(
    Queries.GET_RECIPES
  );

  if (loading) return <LoadingScreen />;
  if (error) {
    return <Text>Error! {error.message}</Text>;
  }

  return (
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
  );
}
