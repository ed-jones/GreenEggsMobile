import React from "react";
import RecipeCommentList from "./RecipeCommentList";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "@ui-kitten/components";
import TopNavigationGeneric from "@greeneggs/core/top-navigation-generic";

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
});

export default function RecipeAllComments({ route }: any) {
  const { comments, commentCount, isReply } = route.params;

  return (
    <>
      <TopNavigationGeneric title={`All ${isReply ? "Replies" : "Comments"}`} />
      <ScrollView>
        <View style={styles.content}>
          <Text style={{ marginBottom: 24 }} category="h5">{`All ${
            isReply ? "Replies" : "Comments"
          } (${commentCount})`}</Text>
          <RecipeCommentList comments={comments} />
        </View>
      </ScrollView>
    </>
  );
}
