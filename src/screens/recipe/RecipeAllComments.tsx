import React from "react";
import { recipe_recipe_data_comments } from "@greeneggs/types/graphql";
import RecipeCommentList from "./RecipeCommentList";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
});

export default function RecipeAllComments({ route }: any) {
  const { comments } = route.params;

  return (
    <View style={styles.content}>
      <RecipeCommentList comments={comments} />
    </View>
  );
}
