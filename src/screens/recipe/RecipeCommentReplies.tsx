import { useQuery } from "@apollo/client";
import { Queries } from "@greeneggs/core";
import { TopNavigation } from "@greeneggs/ui";
import ViewMore from "@greeneggs/core/view-more/ViewMore";
import { comment } from "@greeneggs/types/graphql";
import { Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import LoadingScreen from "../loading/LoadingScreen";
import RecipeAddComment from "./RecipeAddComment";
import RecipeComment from "./RecipeComment";
import RecipeCommentList from "./RecipeCommentList";

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
