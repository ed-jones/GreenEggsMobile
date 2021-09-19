import React from "react";
import RecipeCommentList from "./RecipeCommentList";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  TopNavigation,
  TopNavigationAction,
  Text,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/core";
import { Icons, Queries } from "@greeneggs/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
});

export default function RecipeAllComments({ route }: any) {
  const { comments, commentCount, isReply } = route.params;
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
        title={`All ${isReply ? "Replies" : "Comments"}`}
      />
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
