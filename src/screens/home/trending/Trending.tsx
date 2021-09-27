import * as React from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "@ui-kitten/components";
import { useQuery } from "@apollo/client";
import {
  RecipeFilter,
  Sort,
  Trending as TrendingType,
  TrendingVariables,
  Trending_trending_data,
} from "@greeneggs/types/graphql";
import { Queries } from "@greeneggs/core";

import LoadingScreen from "../../loading/LoadingScreen";
import RecipeCard from "../recipe-card/RecipeCard";
import LazyList from "@greeneggs/core/lazy-list";
import { useNavigation } from "@react-navigation/core";

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

export default function Trending() {
  const navigation = useNavigation();
  return (
    <LazyList<
      TrendingType,
      TrendingVariables,
      Trending_trending_data,
      Sort,
      RecipeFilter
    >
      query={Queries.TRENDING}
      variables={{}}
      dataKey="trending"
      emptyMessage="There are no trending recipes! This means nobody has uploaded a recipe for a while."
      errorMessage="Error! No recipes found."
      renderItem={({ item: recipe, index }) => (
        <View
          key={recipe?.id}
          style={
            index === 0 ? { ...styles.firstCard, ...styles.card } : styles.card
          }
        >
          <RecipeCard
            recipe={recipe}
            onPress={() =>
              navigation.navigate("Recipe", { recipeId: recipe?.id })
            }
          />
        </View>
      )}
    />
  );
}
