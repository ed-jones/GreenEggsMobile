import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Queries } from "@greeneggs/graphql";
import { TopNavigation, ViewMore } from "@greeneggs/ui";
import { comment } from "@greeneggs/types/graphql";
import { Text } from "@ui-kitten/components";
import { View, StyleSheet, ScrollView } from "react-native";
import LoadingScreen from "../loading-screen";
import RecipeAddComment from "./recipe-add-comment";
import RecipeComment from "./recipe-comment";
import RecipeCommentList from "./recipe-comment-list";

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
});

export default function RecipeCommentReplies({ route }: any) {
  const { commentId, replying } = route.params;
  const [visibleCommentCount, setVisibleCommentCount] = useState<number>(3);

  const { data, loading, error } = useQuery<comment>(Queries.GET_COMMENT, {
    variables: {
      commentId,
    },
  });

  if (loading || !data?.comment.data) {
    return <LoadingScreen />;
  }

  if (error) {
    return <Text>Error! {error.message}</Text>;
  }

  const comment = data.comment.data;

  return (
    <>
      <TopNavigation title="Comment Thread" />
      <ScrollView>
        <RecipeComment comment={comment} />
        <View style={styles.content}>
          {replying && (
            <View style={{ marginBottom: 16 }}>
              <RecipeAddComment commentId={comment.id} isReply active />
            </View>
          )}
          {comment.replies.length > 0 && (
            <>
              <Text category="h6" style={{ marginBottom: 16 }}>
                {`All Replies (${comment.replyCount})`}
              </Text>
              <RecipeCommentList
                comments={comment.replies.slice(0, visibleCommentCount)}
              />
            </>
          )}
          {comment.replies.length > visibleCommentCount && (
            <ViewMore
              style={{ marginHorizontal: -16 }}
              onPress={() => setVisibleCommentCount(visibleCommentCount + 3)}
            />
          )}
        </View>
      </ScrollView>
    </>
  );
}
