import * as React from "react";
import { StyleSheet, View } from "react-native";
import {
  NewsFeed as NewsFeedType,
  NewsFeedVariables,
  NewsFeed_newsFeed_data,
  RecipeFilter,
  Sort,
} from "@greeneggs/types/graphql";
import { Queries } from "@greeneggs/graphql";
import { Background, LazyList } from "@greeneggs/ui";
import { useNavigation } from "@react-navigation/native";
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

export function NewsFeed() {
  const navigation = useNavigation();
  return (
    <Background>
      <LazyList<
        NewsFeedType,
        NewsFeedVariables,
        NewsFeed_newsFeed_data,
        Sort,
        RecipeFilter
      >
        query={Queries.NEWS_FEED}
        variables={{}}
        dataKey="newsFeed"
        emptyMessage="News feed empty! Try following some users to see their latest recipes."
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
    </Background>
  );
}
