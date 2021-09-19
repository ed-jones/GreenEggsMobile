import React from "react";
import { recipe_recipe_data_comments } from "@greeneggs/types/graphql";
import RecipeCommentList from "./RecipeCommentList";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  TopNavigation,
  TopNavigationAction,
  Text,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/core";
import { Icons } from "@greeneggs/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RecipeAddComment from "./RecipeAddComment";

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
});

export default function RecipeAllComments({ route }: any) {
  const { comments, commentCount, recipeId } = route.params;
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <>
      <TopNavigation
        style={{ backgroundColor: "transparent", paddingTop: insets.top }}
        accessoryLeft={() => (
          <TopNavigationAction
            icon={Icons.Back}
            onPress={() => navigation.goBack()}
          />
        )}
        alignment="center"
        title="All Comments"
      />
      <ScrollView>
        <View style={styles.content}>
          <Text
            style={{ marginBottom: 24 }}
            category="h5"
          >{`All Comments (${commentCount})`}</Text>
          <RecipeCommentList comments={comments} />
        </View>
      </ScrollView>
    </>
  );
}
