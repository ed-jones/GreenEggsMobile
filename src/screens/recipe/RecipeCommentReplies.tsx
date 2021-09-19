import { Icons } from "@greeneggs/core";
import { useNavigation } from "@react-navigation/core";
import {
  TopNavigation,
  TopNavigationAction,
  Text,
} from "@ui-kitten/components";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RecipeAddComment from "./RecipeAddComment";
import RecipeComment from "./RecipeComment";
import RecipeCommentList from "./RecipeCommentList";

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
});

export default function RecipeCommentReplies({ route }: any) {
  const { comment } = route.params;
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
        title="Reply To Comment"
      />
      <ScrollView>
        <RecipeComment comment={comment} />
        <View style={styles.content}>
          <View>
            <RecipeAddComment commentId={comment.commentId} />
          </View>
        </View>
      </ScrollView>
    </>
  );
}
